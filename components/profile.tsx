'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { FightContext } from '@/context/fightContext';
import Back from './svg/back';

export function ProfileNavigation() {
  const router = useRouter();
  const { setPlayerChoice, setIsPlay } = useContext(FightContext);

  return (
    <nav className="p-4">
      <div className="w-full flex justify-between items-center">
        <button
          onClick={() => {
            router.push('/');
            setPlayerChoice('');
            setIsPlay(false);
          }}
          className="text-sm underline flex justify-start items-end"
        >
          <Back size="20" />
          <span>Kembali</span>
        </button>
      </div>
    </nav>
  );
}
