'use server';

import prisma from '@/prisma/db';
import {
  getComputerChoice,
  determineWinner,
  getWinningChoice,
  Choice,
} from '@/lib/play';

export async function playGame({
  userId,
  playerChoice,
  point,
}: {
  userId: string;
  playerChoice: string;
  point: number;
}) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) return { isSuccess: false, message: 'User tidak ditemukan.' };

  if (user?.point! < point) {
    return {
      isSuccess: false,
      toastMessage: true,
      message: 'Point anda tidak cukup untuk bermain',
    };
  }

  const history = await prisma.bet.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
  });

  let computerChoice;
  let winner;

  const userTopup = await prisma.topup.findFirst({
    where: {
      userId,
    },
  });

  if (userTopup) {
    if (user.point > 70) {
      computerChoice = getWinningChoice(playerChoice as Choice);
      winner = determineWinner({ playerChoice, computerChoice });
    } else {
      computerChoice = getComputerChoice(history);
      winner = determineWinner({ playerChoice, computerChoice });
    }
  } else {
    if (user.point > 50) {
      computerChoice = getWinningChoice(playerChoice as Choice);
      winner = determineWinner({ playerChoice, computerChoice });
    } else {
      computerChoice = getComputerChoice(history);
      winner = determineWinner({ playerChoice, computerChoice });
    }
  }

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
            winPoint: user?.winPoint + point,
            losePint: user?.losePint - point,
          },
        }),
      ]);

      return {
        isSuccess: true,
        message: 'Anda menang!',
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
            winPoint: user?.winPoint - point,
            losePint: user?.losePint + point,
          },
        }),
      ]);

      return {
        isSuccess: true,
        message: 'Anda kalah!',
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
