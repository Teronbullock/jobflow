import { z } from 'zod';

export const RegFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, { message: 'Name must be at least 3 characters long.' }),
    email: z
      .string()
      .trim()
      .refine(val => z.email().safeParse(val).success, {
        message: 'Please enter a valid email.',
      }),
    password: z
      .string()
      .min(8, { message: 'Must be at least 8 characters long' }),
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

export type RegForm = z.infer<typeof RegFormSchema>;

export const LoginFormSchema = z.object({
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

export type LoginForm = z.infer<typeof LoginFormSchema>;
