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
import { signInPlayer } from '@/app/actions/authentication';
import { signInSchema } from '@/schema';
import { toast } from './ui/use-toast';

export default function SignIn() {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: '',
    },
  });

  function onSubmit(username: z.infer<typeof signInSchema>) {
    signInPlayer(username).then((res) => {
      if (res) {
        const { message } = res;
        toast({
          duration: 3000,
          variant: 'destructive',
          title: 'Oops!',
          description: message,
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
        <Button type="submit" className="w-full" size="sm">
          Masuk
        </Button>
      </form>
    </Form>
  );
}
