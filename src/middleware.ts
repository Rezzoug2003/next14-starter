import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const middleware = withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Redirect authenticated users away from /login
    if (pathname.startsWith("/login") && token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Only admins can access /admin
    if (pathname.startsWith("/admin") && (!token || !token.isAdmin)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url)); // or whatever fallback page
    }

    // Allow everything else by default
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;

        // Allow unauthenticated users to access login
        if (pathname.startsWith("/login") && !token) {
          return true;
        }

        // Protect /admin
        if (pathname.startsWith("/admin")) {
          return !!(token && token.isAdmin);
        }

        // Protect /blog
        if (pathname.startsWith("/blog")) {
          return !!token;
        }

        // Allow everything else
        return true;
      },
    },
  }
);

export default middleware;

export const config = {
  matcher: ["/admin/:path*", "/blog/:path*", "/login"],
};
