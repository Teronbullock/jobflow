import { z } from 'zod';

export const baseAuthSchema = z.object({
  email: z
    .string()
    .trim()
    .refine(val => z.email().safeParse(val).success, {
      message: 'Please enter a valid email.',
    }),
  password: z
    .string()
    .min(8, { message: 'Must be at least 8 characters long' }),
});

export type BaseAuth = z.infer<typeof baseAuthSchema>;

export const regAuthSchema = baseAuthSchema
  .extend({
    name: z
      .string()
      .trim()
      .min(3, { message: 'Name must be at least 3 characters long.' }),
    passwordConfirm: z
      .string()
      .min(8, { message: 'Must be at least 8 characters long' }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        path: ['passwordConfirm'],
        code: 'custom',
        message: 'Passwords do not match',
      });
    }
  });

export type RegAuth = z.infer<typeof regAuthSchema>;
