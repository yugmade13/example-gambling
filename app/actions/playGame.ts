'use server';

import prisma from '@/prisma/db';
import { generateComputerChoice, determineWinner } from '@/lib/play';

export async function playGame({
  userId,
  playerChoice,
  point,
}: {
  userId: string;
  playerChoice: string;
  point: number;
}) {
  const computerChoice = generateComputerChoice();
  const winner = determineWinner({ playerChoice, computerChoice });

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) return { isSuccess: false, message: 'User tidak ditemukan.' };

  if (winner === 'player') {
    try {
      const transaction = await prisma.$transaction([
        prisma.bet.create({
          data: {
            userId,
            playerChoice,
            computerChoice,
            point,
            winner,
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

      return {
        isSuccess: true,
        message: 'Pemain menang!',
        data: transaction[0],
      };
    } catch (error) {
      return {
        isSuccess: false,
        message: 'Aku tidak yakin, tapi sepertinya ada seesuatu yang salah.',
      };
    }
  } else if (winner === 'computer') {
    try {
      const transaction = await prisma.$transaction([
        prisma.bet.create({
          data: {
            userId,
            playerChoice,
            computerChoice,
            point,
            winner,
          },
        }),
        prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            point: user?.point! - point,
          },
        }),
      ]);

      return {
        isSuccess: true,
        message: 'Computer menang!',
        data: transaction[0],
      };
    } catch (error) {
      return {
        isSuccess: false,
        message: 'Aku tidak yakin, tapi sepertinya ada seesuatu yang salah.',
      };
    }
  } else {
    const data = await prisma.bet.create({
      data: {
        userId,
        playerChoice,
        computerChoice,
        point,
        winner,
      },
    });

    return {
      isSuccess: true,
      message: 'Permainan draw!',
      data,
    };
  }
}
