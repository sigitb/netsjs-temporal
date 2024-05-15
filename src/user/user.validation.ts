import { z, ZodType } from 'zod';

export class UserValidation {
  static readonly REGISTER: ZodType = z.object({
    username: z
      .string({ message: 'Username must be a string' })
      .min(1, { message: 'Username must be at least 1 characters long' })
      .max(100, {
        message: 'Username must consist of a maximum of 100 characters',
      }),
    password: z
      .string({ message: 'Password must be a string' })
      .min(1, { message: 'Password must be at least 1 characters long' })
      .max(100, {
        message: 'Password must consist of a maximum of 100 characters',
      }),
    name: z
      .string({ message: 'Name must be a string' })
      .min(1, { message: 'Name must be at least 1 characters long' })
      .max(100, {
        message: 'Name must consist of a maximum of 100 characters',
      }),
  });

  static readonly LOGIN: ZodType = z.object({
    username: z.string().min(1).max(100),
    password: z.string().min(1).max(100),
  });

  static readonly UPDATE: ZodType = z.object({
    name: z
      .string({ message: 'Name must be a string' })
      .min(1, { message: 'Name must be at least 1 characters long' })
      .max(100, {
        message: 'Name must consist of a maximum of 100 characters',
      })
      .optional(),
    password: z
      .string({ message: 'Password must be a string' })
      .min(1, { message: 'Password must be at least 1 characters long' })
      .max(100, {
        message: 'Password must consist of a maximum of 100 characters',
      })
      .optional(),
  });
}
