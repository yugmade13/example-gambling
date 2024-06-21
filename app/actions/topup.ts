'use server';

import prisma from '@/prisma/db';

export async function topupPointUser({
  userId,
  point,
}: {
  userId: string;
  point: number;
}) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) return { isSuccess: false, message: 'User tidak ditemukan.' };

  const userTopup = await prisma.topup.findMany({
    where: {
      userId,
    },
  });

  if (userTopup.length >= 2) {
    return {
      isSuccess: false,
      message: 'Anda hanya mendapatkan kesempatan topup 2x',
    };
  }

  try {
    await prisma.$transaction([
      prisma.topup.create({
        data: {
          userId,
          point,
        },
      }),
      prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          point: user?.point! + point,
        },
      }),
    ]);

    return { isSuccess: true, message: 'Point berhasil ditambahkan' };
  } catch (error) {
    return {
      isSuccess: false,
      message: 'Aku tidak yakin, tapi sepertinya ada seesuatu yang salah.',
    };
  }
}
