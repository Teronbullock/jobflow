import { z } from 'zod';

export const companyRegSchema = z.object({
  companyName: z
    .string()
    .nonempty('Company name is required')
    .min(3, 'Company name must be at least 3 characters long'),
});

export type CompanyReg = z.infer<typeof companyRegSchema>;
