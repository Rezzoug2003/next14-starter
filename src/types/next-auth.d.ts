import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      isAdmin: boolean;
      email?: string | null;
      image?: string | null;
      name?: string | null;
    };
  }
}
