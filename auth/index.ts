import NextAuth, { NextAuthConfig } from 'next-auth';
import { FirestoreAdapter } from '@auth/firebase-adapter';
import Google from 'next-auth/providers/google';
// import credentialsProvider from './credentials';
import Resend from 'next-auth/providers/resend';
// import { ServerSession } from '@/lib/types/auth';

export const BASE_AUTH = '/api/auth';

const options: NextAuthConfig = {
  basePath: BASE_AUTH,
  secret: process.env.AUTH_SECRET,
  adapter: FirestoreAdapter(),
  providers: [
    Google,
    Resend({
      from: process.env.AUTH_RESEND_EMAIL_FROM
    })
  ],
  pages: {
    signIn: '/signin',
    newUser: '/fresh',
    signOut: '/signout'
  },
};

// export async function getServerSession(): Promise<ServerSession | null>{
//   const session = await NextAuth(options).auth();
//   if (!session) return null;
//   return session as ServerSession;
// }

export const { handlers, auth, signIn, signOut } = NextAuth(options);
