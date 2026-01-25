import { z } from 'zod';

export const jobSchema = z.object({
  clientName: z.string().min(3, 'Name must be at least 3 characters long'),
  address: z.string().min(6, 'Address must be at least 6 characters long'),
  description: z.string().min(1, 'Description required'),
  date: z.iso.date('Invalid date'),
  time: z.string().min(1, 'Time required'),
  assignedTo: z.string().min(1, 'Crew member required'),
  amount: z.string().min(1, 'Amount required'),
});

export type JobSchema = z.infer<typeof jobSchema>;
