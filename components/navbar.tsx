import Link from 'next/link';
import Rocket from './svg/rocket';
import Point from './svg/point';
import { User } from '@prisma/client';

export default function Navbar({ point }: { point: number }) {
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
