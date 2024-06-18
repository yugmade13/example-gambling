'use server';

import { z } from 'zod';
import { signUpSchema, signInSchema } from '@/schema';
import { AuthError } from 'next-auth';
import { signIn } from '@/auth';
import prisma from '@/prisma/db';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

export async function signInPlayer({ username }: z.infer<typeof signInSchema>) {
  try {
    await signIn('credentials', {
      username,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      const err = error.cause?.err as Error & { code?: string };

      switch (err.code) {
        case 'credentials':
          return {
            isSuccess: false,
            message: 'Username yang anda masukkan salah.',
          };
        default:
          return {
            isSuccess: false,
            message: 'Aku tidak yakin, tapi epertinya ada seesuatu yang salah.',
          };
      }
    }

    throw error;
  }
}

export async function signUpPlayer(values: z.infer<typeof signUpSchema>) {
  const { name, username } = values;

  const isExist = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (isExist) {
    return {
      isSuccess: false,
      message: 'Username telah digunakan, ganti dengan dengan username lain.',
    };
  }

  await prisma.user.create({
    data: {
      name,
      username,
    },
  });

  return {
    isSuccess: true,
    message:
      'Pendaftaran berhasil, silahkan masuk dengan username yang anda buat.',
  };
}
