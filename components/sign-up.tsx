'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DrawerFooter } from '@/components/ui/drawer';
import { signUpPlayer } from '@/app/actions/authentication';
import { signUpSchema } from '@/schema';
import { Dispatch, SetStateAction, useTransition } from 'react';
import Reload from './svg/reload';
import { toast } from '@/components/ui/use-toast';

export default function SignUp({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      username: '',
    },
  });

  function onSubmit(values: z.infer<typeof signUpSchema>) {
    startTransition(() => {
      signUpPlayer(values).then((res) => {
        const { isSuccess, message } = res;

        if (isSuccess) {
          setIsOpen(false);
          toast({
            duration: 3000,
            title: 'Berhasil!',
            description: message,
          });
        } else {
          toast({
            duration: 3000,
            variant: 'destructive',
            title: 'Oops!',
            description: message,
          });
        }
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="px-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="Name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="px-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DrawerFooter>
          <Button
            disabled={isPending}
            type="submit"
            className="w-full"
            size="sm"
          >
            {isPending && (
              <Reload size="3" className="mr-2 h-4 w-4 animate-spin" />
            )}
            Daftar
          </Button>
        </DrawerFooter>
      </form>
    </Form>
  );
}
