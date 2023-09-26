import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: number
            username: string;
            access_token: string;
        }
    }

    interface User {
        access_token: string,
        username: string
      }
}