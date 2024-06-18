'use client';

import Image from 'next/image';
import { Button } from './ui/button';
import { SubmitHandler, useForm, UseFormRegister } from 'react-hook-form';
import rockImage from '@/assets/rock.svg';
import paperImage from '@/assets/paper.svg';
import scissorsImage from '@/assets/scissors.svg';
import { ChangeEvent, PropsWithChildren, useCallback, useContext } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader } from './ui/card';
import Point from './svg/point';
import { FightContext } from '@/context/fightContext';
import { playGame } from '@/lib/playgame';

type FormType = {
  point: string;
  playerChoice: string;
};

export const RadioGroup = ({
  children,
  className,
  title,
}: PropsWithChildren<{ className: string; title: string }>) => {
  return (
    <>
      <h2 className="mb-2 text-xs text-slate-500">{title}</h2>
      <div className={cn('grid gap-2', className)}>{children}</div>
    </>
  );
};

export const Radio = ({
  children,
  id,
  value,
  register,
  type,
}: PropsWithChildren<{
  id: string;
  value: string;
  type: 'point' | 'playerChoice';
  register: UseFormRegister<{ point: string; playerChoice: string }>;
}>) => {
  const { setPlayerChoice } = useContext(FightContext);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'playerChoice') {
      setPlayerChoice(value);
    }
  };

  return (
    <>
      <input
        className="hidden card-input-element"
        type="radio"
        value={value}
        id={id}
        {...register(type, {
          onChange: handleInputChange,
        })}
      />
      <Card className="card-input cursor-pointer">
        <CardHeader>
          <label
            htmlFor={id}
            className="w-full flex justify-center items-center gap-1"
          >
            {type === 'point' && <Point size="17" />}
            {children}
          </label>
        </CardHeader>
      </Card>
    </>
  );
};

export default function FormPlay() {
  const { register, handleSubmit, watch, reset } = useForm<FormType>();
  const { setPlayerChoice, setComputerChoice, setMessage, isPlay, setIsPlay } =
    useContext(FightContext);

  const computerChoice = useCallback(() => {
    const choices: string[] = ['rock', 'paper', 'scissors'];
    const randomIndex: number = Math.floor(Math.random() * choices.length);
    setComputerChoice(choices[randomIndex]);
    return choices[randomIndex];
  }, [setComputerChoice]);

  const onSubmit: SubmitHandler<FormType> = ({ playerChoice }) => {
    setIsPlay(true);
    const result = playGame(playerChoice, computerChoice());
    setMessage(result);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RadioGroup className="grid-cols-5 mb-6" title="Pasang taruhan">
        <Radio id="1" value="1" type="point" register={register}>
          <h3 className="text-xs ">1K</h3>
        </Radio>
        <Radio id="1.5" value="1.5" type="point" register={register}>
          <h3 className="text-xs ">1.5K</h3>
        </Radio>
        <Radio id="2" value="2" type="point" register={register}>
          <h3 className="text-xs ">2K</h3>
        </Radio>
        <Radio id="3" value="3" type="point" register={register}>
          <h3 className="text-xs ">3K</h3>
        </Radio>
        <Radio id="5" value="5" type="point" register={register}>
          <h3 className="text-xs ">5K</h3>
        </Radio>
      </RadioGroup>
      <RadioGroup className="grid-cols-3 mb-6" title="Pilih senjata">
        <Radio id="rock" value="rock" type="playerChoice" register={register}>
          <Image src={rockImage} height={40} alt="rock, paper and scissors" />
        </Radio>
        <Radio id="paper" value="paper" type="playerChoice" register={register}>
          <Image src={paperImage} height={40} alt="rock, paper and scissors" />
        </Radio>
        <Radio
          id="scissors"
          value="scissors"
          type="playerChoice"
          register={register}
        >
          <Image
            src={scissorsImage}
            height={40}
            alt="rock, paper and scissors"
          />
        </Radio>
      </RadioGroup>
      <div className="flex flex-col gap-2">
        {isPlay ? (
          <Button
            type="button"
            className="w-full"
            onClick={() => {
              reset({ point: '', playerChoice: '' });
              setPlayerChoice('');
              setIsPlay(false);
            }}
          >
            Main lagi?
          </Button>
        ) : (
          <>
            <Button
              disabled={!watch('point') || !watch('playerChoice')}
              type="submit"
              className="w-full"
            >
              Main sekarang!
            </Button>
            <Button
              onClick={() => {
                reset({ point: '', playerChoice: '' });
                setPlayerChoice('');
              }}
              variant="outline"
              type="button"
              className="w-full"
            >
              Reset
            </Button>
          </>
        )}
      </div>
    </form>
  );
}
