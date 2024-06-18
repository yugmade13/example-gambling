'use client';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import SignIn from '../../components/sign-in';
import SignUp from '../../components/sign-up';
import { useState } from "react";

export default function LoginForm() {
  const [isOpen ,setIsOpen] = useState(false);  

  return (
    <section className="min-h-screen max-w-[500px] m-auto flex justify-center items-center flex-col">
      <div className="w-full px-4">
        <h2 className="text-2xl text-slate-900 font-bold text-center mb-6">
          {'Permainan'} <br></br>
          {'Batu, Gunting dan Kertas'}
        </h2>
        <SignIn />
      </div>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <div className="text-slate-500 text-sm mt-6">
          {'Belum punya akun? daftar '}
          <DrawerTrigger className="font-semibold text-slate-900 underline">
            disini
          </DrawerTrigger>
        </div>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Daftar Permainan</DrawerTitle>
            <DrawerDescription>
              Daftar dan menangkan sekarang juga!
            </DrawerDescription>
          </DrawerHeader>
          <SignUp setIsOpen={setIsOpen}/>
        </DrawerContent>
      </Drawer>
    </section>
  );
}
