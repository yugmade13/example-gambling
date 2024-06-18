'use client';

import Link from 'next/link';
import Rocket from './svg/rocket';
import Point from './svg/point';
import { useContext, useEffect, useState } from 'react';
import { FightContext } from '@/context/fightContext';

export default function Navbar({
  usersId,
}: {
  usersId: string;
}) {
  const { isPlay } = useContext(FightContext);
  const [point, setPoint] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/users?id=' + usersId, {
          cache: 'no-store',
        });
        const data = await res.json();
        setPoint(data.data.point);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [usersId, isPlay]);

  return (
    <nav className="p-4">
      <div className="w-full flex justify-between items-center">
        <Link
          href="/topup"
          className="text-sm underline flex justify-start items-end gap-2"
        >
          <span>Top Up</span>
          <Rocket size="17" />
        </Link>
        <Link
          href="/profile"
          className="text-sm underline flex justify-end items-end gap-2"
        >
          <span>{point}K</span>
          <Point size="18" />
        </Link>
      </div>
    </nav>
  );
}
