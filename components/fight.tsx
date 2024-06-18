'use client';

import Image from 'next/image';
import rockImage from '@/assets/rock.svg';
import paperImage from '@/assets/paper.svg';
import scissorsImage from '@/assets/scissors.svg';
import { useContext } from 'react';
import { FightContext } from '@/context/fightContext';

const renderChoiceImage = (choice: string) => {
  let choiceImage;

  switch (choice) {
    case 'rock':
      choiceImage = rockImage;
      break;
    case 'paper':
      choiceImage = paperImage;
      break;
    case 'scissors':
      choiceImage = scissorsImage;
      break;
    default:
      choiceImage = '';
      break;
  }

  return choiceImage;
};

function CompareFight({
  playerChoice,
  computerChoice,
  message,
}: {
  playerChoice: string;
  computerChoice: string;
  message: string;
}) {
  const playerChoiceImage = renderChoiceImage(playerChoice);
  const computerChoiceImage = renderChoiceImage(computerChoice);

  return (
    <>
      <div className="w-full flex justify-end items-center">
        <div className="mr-6 w-[125px] h-[125px] bg-red-100 rounded-full flex justify-center items-center border border-slate-900">
          <Image src={computerChoiceImage} height={75} alt="computer" />
        </div>
      </div>
      <h1 className="text-xl font-semibold text-center">{message}</h1>
      <div>
        <div className="w-full  flex justify-start items-center">
          <div className="ml-6 w-[125px] h-[125px] bg-red-100 rounded-full flex justify-center items-center border border-slate-900">
            <Image src={playerChoiceImage} height={75} alt="computer" />
          </div>
        </div>
      </div>
    </>
  );
}

export default function Fight() {
  const { playerChoice, computerChoice, message, isPlay } =
    useContext(FightContext);

  const playerChoiceImage = renderChoiceImage(playerChoice);

  return (
    <div className="h-[380px] w-full overflow-hidden">
      <div
        className={`h-full flex flex-col justify-center ${
          !isPlay && 'items-center'
        } gap-4`}
      >
        {isPlay ? (
          <CompareFight
            playerChoice={playerChoice}
            computerChoice={computerChoice}
            message={message}
          />
        ) : (
          <div className="mr-6 w-[200px] h-[200px] bg-red-100 rounded-full flex justify-center items-center border border-slate-900">
            {playerChoiceImage && (
              <Image src={playerChoiceImage} height={125} alt="" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
