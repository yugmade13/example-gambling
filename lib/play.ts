import { Bet } from '@prisma/client';

export type Choice = 'rock' | 'paper' | 'scissors';

const choices: Choice[] = ['rock', 'paper', 'scissors'];

function getRandomChoice(): Choice {
  return choices[Math.floor(Math.random() * choices.length)];
}

export function getWinningChoice(choice: Choice): Choice {
  const winningMap: Record<Choice, Choice> = {
    rock: 'paper',
    paper: 'scissors',
    scissors: 'rock',
  };
  return winningMap[choice];
}

export function getComputerChoice(history: Bet[]) {
  if (history.length < 2) {
    return getRandomChoice();
  } else {
    const historis = history.slice(0, 2);
    const sameChoice = historis.every(
      (item) => item.playerChoice === historis[0].playerChoice
    );

    if (sameChoice) {
      return getWinningChoice(historis[0].playerChoice as Choice);
    }

    return getRandomChoice();
  }
}

export function determineWinner({
  playerChoice,
  computerChoice,
}: {
  playerChoice: string;
  computerChoice: string;
}): string {
  if (playerChoice === computerChoice) {
    return 'draw';
  }

  if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'scissors' && computerChoice === 'paper') ||
    (playerChoice === 'paper' && computerChoice === 'rock')
  ) {
    return 'player';
  } else {
    return 'computer';
  }
}
