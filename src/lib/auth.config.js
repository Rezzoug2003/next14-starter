// export const authConfig = {
//   pages: {
//     signIn: "/login",
//   },
//   providers: [],
//   callbacks: {
//     // FOR MORE DETAIL ABOUT CALLBACK FUNCTIONS CHECK https://next-auth.js.org/configuration/callbacks
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.isAdmin = user.isAdmin;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id;
//         session.user.isAdmin = token.isAdmin;
//       }
//       return session;
//     },
//     authorized({ auth, request }) {
//       const user = auth?.user;
//       const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");
//       const isOnBlogPage = request.nextUrl?.pathname.startsWith("/blog");
//       const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");

//       // ONLY ADMIN CAN REACH THE ADMIN DASHBOARD

//       if (isOnAdminPanel && !user?.isAdmin) {
//         return false;
//       }

//       // ONLY AUTHENTICATED USERS CAN REACH THE BLOG PAGE

//       if (isOnBlogPage && !user) {
//         return false;
//       }

//       // ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE

//       if (isOnLoginPage && user) {
//         return Response.redirect(new URL("/", request.nextUrl));
//       }

//       return true;
//     },
//   },
// };
// +++++++++++++++++++++++++++
// export const authConfig = {
//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.isAdmin = user.isAdmin || false;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user = {
//           id: token.id,
//           isAdmin: token.isAdmin || false,
//         };
//       }
//       return session;
//     },
//     async redirect({ url, baseUrl }) {
//       // Redirect to home page after successful login
//       return url.startsWith(baseUrl) ? url : baseUrl;
//     },
//   },
// };
// =++++++++++++++++++++++++++++++
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
      }
      console.log("session", session);
      return session;
    },
    authorized({ auth, request }) {
      const user = auth?.user;
      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");

      // Redirect authenticated users away from the login page
      if (isOnLoginPage && user) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      return true; // Allow access to other pages
    },
  },
};
