import { z } from 'zod';

export type authStatusType = {
  isSuccess: boolean
  message: string
}

export const signUpSchema = z.object({
  name: z.string().min(3, {
    message: 'Nama harus lebih dari 3 karakter',
  }),
  username: z.string().min(3, {
    message: 'Username harus lebih dari 3 karakter',
  }),
});

export const signInSchema = z.object({
  username: z.string().min(3, {
    message: 'Username harus lebih dari 3 karakter',
  }),
});