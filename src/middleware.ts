import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth({
  authorized({ token, req }) {
    console.log("token middleware:", token);
    const pathname = req.nextUrl.pathname;

    // Allow unauthenticated users to access login page
    if (pathname.startsWith("/login") && !token) {
      return true;
    }

    // Redirect authenticated users away from the login page
    if (pathname.startsWith("/login") && token) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
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
});

export const config = {
  unstable_allowDynamic: [
    "/lib/utils.js",
    "**/node_modules/function-bind/**",
    "/node_modules/mongoose/**",
  ],
  matcher: ["/admin/:path*", "/blog/:path*", "/login"],
};
