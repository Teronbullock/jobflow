import { z } from 'zod';

export const addMemberSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['owner', 'admin', 'member']),
});

export const inviteMemberSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email address'),
  role: z.enum(['owner', 'admin', 'member']),
});

export const updateMemberRoleSchema = z.object({
  role: z.enum(['owner', 'admin', 'member']),
});

export type AddMemberForm = z.infer<typeof addMemberSchema>;
export type InviteMemberForm = z.infer<typeof inviteMemberSchema>;
export type UpdateMemberRoleForm = z.infer<typeof updateMemberRoleSchema>;
