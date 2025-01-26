import NextAuth from "next-auth";
import { authConfig } from "./lib/auth.config";
import withAuth from "next-auth/middleware";
import { connectTob } from "./lib/utils";
import { User } from "./lib/model";

export default withAuth({
  callbacks: {
    async jwt({ token, user }) {
      try {
        connectTob();
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
    authorized({ token, req }) {
      console.log("token meddle", token);
      const pathname = req.nextUrl.pathname;
      // Allow unauthenticated users to access login page
      if (pathname.startsWith("/login") && !token) {
        return true;
      }
      // Redirect authenticated users away from the login page
      if (pathname.startsWith("/login") && token) {
        return Response.redirect(new URL("/", req.nextUrl));
      }

      // Only admins can access the admin panel
      if (pathname.startsWith("/admin") && (!token || !token.isAdmin)) {
        return false;
      }
      // Only authenticated users can access the blog
      if (pathname.startsWith("/blog") && !token) {
        return false;
      }
      // Allow everything else by default
      return true;
    },
  },
});

export const config = {
  matcher: ["/admin/:path*", "/blog/:path*", "/login"],
};
