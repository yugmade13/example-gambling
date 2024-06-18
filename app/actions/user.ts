'use server';

import prisma from '@/prisma/db';

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    return null;
  }

  return user;
}
