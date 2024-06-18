'use client';

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

type FightContextType = {
  playerChoice: string;
  setPlayerChoice: Dispatch<SetStateAction<string>>;
  computerChoice: string;
  setComputerChoice: Dispatch<SetStateAction<string>>;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  isPlay: boolean;
  setIsPlay: Dispatch<SetStateAction<boolean>>;
};

export const FightContext = createContext({} as FightContextType);

export default function FightContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [playerChoice, setPlayerChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [message, setMessage] = useState('');
  const [isPlay, setIsPlay] = useState(false);

  const fightContextValue = {
    playerChoice,
    setPlayerChoice,
    computerChoice,
    setComputerChoice,
    message,
    setMessage,
    isPlay,
    setIsPlay,
  };

  return (
    <FightContext.Provider value={fightContextValue}>
      {children}
    </FightContext.Provider>
  );
}
