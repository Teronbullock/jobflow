import { z } from 'zod';

export const inviteMemberSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['owner', 'admin', 'member']),
});

export const updateMemberRoleSchema = z.object({
  role: z.enum(['owner', 'admin', 'member']),
});

export type InviteMemberForm = z.infer<typeof inviteMemberSchema>;
export type UpdateMemberRoleForm = z.infer<typeof updateMemberRoleSchema>;
