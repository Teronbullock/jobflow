import { z } from 'zod';

export const crewFormSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  email: z.email('Invalid email address'),
});

export type CrewForm = z.infer<typeof crewFormSchema>;
