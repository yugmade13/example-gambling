import { CredentialsSignin, type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { signInSchema } from './schema';
import prisma from './prisma/db';

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validate = signInSchema.safeParse(credentials);

        if (validate.success) {
          const { username } = validate.data;

          const user = await prisma.user.findUnique({
            where: {
              username,
            },
          });

          if (user) return user;

          return null;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
