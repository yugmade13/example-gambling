import NextAuth, { type DefaultSession } from 'next-auth';
import authConfig from './auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from './prisma/db';
import { getUserById } from './app/actions/user';
import { User } from '@prisma/client';
export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  callbacks: {
    async session({ session, token }) {
      const { id, name } = token.user as User;

      session.user.id = id;
      session.user.name = name;
      return session;
    },
    async jwt({ token }) {
      const user = await getUserById(token.sub!);

      if (!user) {
        return token;
      }

      token.user = user;
      return token;
    },
  },
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig,
});
