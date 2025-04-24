import { type AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { User } from "./model";
import bcrypt from "bcryptjs";

import { connectToDb } from "./utils";

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
          let existingUser = await User.findOne({ email: profile?.email });
          if (!existingUser) {
            const newUser = new User({
              username: profile?.login,
              email: profile?.email,
              image: profile?.avatar_url,
            });
            await newUser.save();
          }
        } catch (err) {
          console.error("Error in GitHub sign-in:", err.message);
          return false;
        }
      }
      return true;
    },
    async jwt({ token }) {
      try {
        connectToDb();
        const users = await User.findOne({ email: token.email });
        if (users) {
          token.id = users.id;
          token.username = users.username;
          token.isAdmin = users.isAdmin;
        }
      } catch (err) {
        console.error(err);
        return null;
      }
      console.log(token);
      return token;
    },
    async session({ session }) {
      try {
        connectToDb();
        const users = await User.findOne({
          email: session.user.email,
        });
        if (users) {
          session.user.id = users.id;
          session.user.username = users.username;
          session.user.isAdmin = users.isAdmin;
        }
      } catch (e) {
        throw new Error(e);
      }

      return session;
    },
  },
  // ...authConfig.callbacks,
  secret: process.env.NEXTAUTH_SECRET,
};
