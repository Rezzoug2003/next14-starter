import { type AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { User } from "./model";
import bcrypt from "bcryptjs";

import { connectToDb } from "./utils";

// Custom login function for CredentialsProvider
const login = async (credentials: any) => {
  try {
    connectToDb();
    const user = await User.findOne({ username: credentials.username });
    if (!user) throw new Error("Wrong credentials!");

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) throw new Error("Wrong credentials!");

    return {
      id: user.id,
      username: user.username,
      isAdmin: user.isAdmin || false,
    };
  } catch (err: any) {
    console.error("Login error:", err.message);
    throw new Error("Failed to login");
  }
};

export const authOption: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      credentials: {}, // 👈 Added to fix CredentialsProvider TS error
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "github") {
        try {
          connectToDb();

          // 👇 Explicitly typing GitHub profile to avoid TS error
          const githubProfile = profile as {
            login: string;
            email: string;
            avatar_url: string;
          };

          let existingUser = await User.findOne({ email: githubProfile.email });
          if (!existingUser) {
            const newUser = new User({
              username: githubProfile.login,
              email: githubProfile.email,
              image: githubProfile.avatar_url,
            });
            await newUser.save();
          }
        } catch (err: any) {
          console.error("Error in GitHub sign-in:", err.message);
          return false;
        }
      }
      return true;
    },
    jwt: async ({ token }) => {
      try {
        connectToDb();
        const user = await User.findOne({ email: token.email });

        if (user) {
          token.userId = user._id.toString();
          token.isAdmin = user.isAdmin;
        }

        return token; // ✅ Always return a JWT
      } catch (err) {
        console.error(err);
        return token; // ✅ fallback to original token on error
      }
    },
    session: async ({ session, token }) => {
      try {
        connectToDb();
        const users = await User.findOne({ email: session.user?.email });
        if (!session.user) return session; // 🛑 if no user, just return session as-is
        if (users) {
          session.user.id = users.id;
          session.user.username = users.username;
          session.user.isAdmin = users.isAdmin;
        }
        return session;
      } catch (err) {
        console.error(err);
        return session;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
