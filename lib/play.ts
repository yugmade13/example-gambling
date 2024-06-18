export function generateComputerChoice() {
  const choices: string[] = ['rock', 'paper', 'scissors'];
  const randomIndex: number = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
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
