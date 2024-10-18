import NextAuth, { NextAuthConfig } from 'next-auth';
import { FirestoreAdapter } from "@auth/firebase-adapter";
import Google from "next-auth/providers/google";
// import credentialsProvider from './credentials';
import Resend from "next-auth/providers/resend";

export const BASE_AUTH = '/api/auth';

const options: NextAuthConfig = {
    adapter : FirestoreAdapter(),
    providers: [
        Google,
        Resend({
            from: process.env.AUTH_EMAIL_FROM,
        })
    ],
    basePath: BASE_AUTH,
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: '/signin',
        newUser: '/fresh',
        signOut: '/signout',
    },
};

export const { handlers, auth, signIn, signOut } = NextAuth(options);