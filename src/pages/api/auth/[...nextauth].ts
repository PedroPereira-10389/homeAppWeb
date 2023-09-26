import { Message } from "@/components/toast";
import { authApi } from "@/server/api/auth/auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { encode, decode } from 'next-auth/jwt';
import { error } from "console";

export default NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    pages: { signIn: '/' },
    session: {
        strategy: "jwt",
    },
    jwt: { encode, decode },
    providers: [

        CredentialsProvider({
            id: 'credentials',
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "example@example.com",
                },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials, req) {
                try {
                    const results = await authApi(credentials)
                    if (results['status'] == 200) {
                        const user = results['message']['user'];
                        return user
                    }
                    throw new Error(results['message']['user'])
                } catch (error) {
                    throw new Error('Please check your credentials')
                }

            }
        })
    ],
    callbacks: {
        async signIn({}) {
            const isAllowedToSignIn = true
            if (isAllowedToSignIn) {
                return true
            } else {
               
                Message("Please verify your credentials", 500);
                // Return false to display a default error message
                return false
                // Or you can return a URL to redirect to:
                // return '/unauthorized'
            }
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
        async session({ session, user, token }) {
            session.access_token = token.access_token;
            session.user.role=token.user.role
            return session
        },
        async jwt({ token, user }) {
            if (user) {
                token.access_token = user.access_token;
                token.user= user
            }
            return token
        }
    }
})