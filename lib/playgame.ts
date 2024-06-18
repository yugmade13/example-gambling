function determineWinner(playerChoice: string, computerChoice: string): string {
  if (playerChoice === computerChoice) {
    return "It's a tie!";
  }

  if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'scissors' && computerChoice === 'paper') ||
    (playerChoice === 'paper' && computerChoice === 'rock')
  ) {
    return 'Player wins!';
  } else {
    return 'Computer wins!';
  }
}

export function playGame(playerChoice: string, computerChoice: string) {
  const result = determineWinner(playerChoice, computerChoice);
  return result;
}
