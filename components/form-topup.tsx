'use client';

import { useRouter } from 'next/navigation';
import { PropsWithChildren, useContext } from 'react';
import { SubmitHandler, useForm, UseFormRegister } from 'react-hook-form';
import { Card, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import Point from './svg/point';
import { FightContext } from '@/context/fightContext';
import { topupPointUser } from '@/app/actions/topup';
import { toast } from './ui/use-toast';

type TopupType = {
  point: number;
};

export const RadioGroup = ({
  children,
  className,
  title,
}: PropsWithChildren<{ className: string; title: string }>) => {
  return (
    <>
      <h2 className="mb-8 text-2xl text-slate-900 text-center">{title}</h2>
      <div className={cn('grid gap-2', className)}>{children}</div>
    </>
  );
};

export const Radio = ({
  children,
  id,
  value,
  register,
}: PropsWithChildren<{
  id: string;
  value: number;
  register: UseFormRegister<{ point: number }>;
}>) => {
  return (
    <>
      <input
        className="hidden card-input-element"
        type="radio"
        value={value}
        id={id}
        {...register('point')}
      />
      <Card className="card-input cursor-pointer">
        <CardHeader className="w-full flex flex-col justify-center items-center">
          <label
            htmlFor={id}
            className="w-full flex justify-center items-center gap-1"
          >
            <Point size="17" />
            {value}K
          </label>
          <div className="text-xs">Rp{children}</div>
        </CardHeader>
      </Card>
    </>
  );
};

export default function FormTopUp({ userId }: { userId: string }) {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<TopupType>();
  const { setPlayerChoice, setIsPlay } = useContext(FightContext);

  const onSubmit: SubmitHandler<TopupType> = async ({ point }) => {
    if (Number(point) > 0) {
      await topupPointUser({ userId, point: Number(point) }).then(
        ({ isSuccess, message }) => {
          if (isSuccess) {
            toast({
              duration: 3000,
              title: 'Hore!',
              description: message,
            });
          } else {
            toast({
              duration: 3000,
              variant: 'destructive',
              title: 'Maaf!',
              description: message,
            });
          }
          reset();
        }
      );
    } else {
      toast({
        duration: 3000,
        variant: 'destructive',
        title: 'Peringatan!',
        description: 'Silahkan pilih point  teerlebih dahulu.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full px-4">
      <RadioGroup className="grid-cols-3 mb-6" title="Top Up Poin">
        <Radio id="10" value={10} register={register}>
          10.000
        </Radio>
        <Radio id="15" value={15} register={register}>
          15.000
        </Radio>
        <Radio id="20" value={20} register={register}>
          20.000
        </Radio>
        <Radio id="25" value={25} register={register}>
          25.000
        </Radio>
        <Radio id="30" value={30} register={register}>
          30.000
        </Radio>
        <Radio id="35" value={35} register={register}>
          35.000
        </Radio>
        <Radio id="40" value={40} register={register}>
          40.000
        </Radio>
        <Radio id="45" value={45} register={register}>
          45.000
        </Radio>
        <Radio id="50" value={50} register={register}>
          50.000
        </Radio>
      </RadioGroup>
      <div className="flex flex-col gap-2">
        <Button type="submit" className="w-full">
          Top Up
        </Button>
        <Button
          onClick={() => {
            router.push('/');
            setPlayerChoice('');
            setIsPlay(false);
          }}
          variant="outline"
          type="button"
          className="w-full text-red-500 border-red-300 bg-red-50 hover:bg-red-100 hover:text-red-500"
        >
          Kembali
        </Button>
      </div>
    </form>
  );
}
