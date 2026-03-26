'use server';

import { headers } from 'next/headers';
import { auth } from '@/features/auth/lib/auth';
import type { MembersResponse } from '../types';

export const getMembers = async (
  userOrgId: string,
): Promise<MembersResponse | null> => {
  try {
    const data = await auth.api.listMembers({
      query: {
        organizationId: userOrgId,
        limit: 100,
        filterOperator: 'eq',
        filterValue: 'value',
      },
      headers: await headers(),
    });

    if (!data) return null;

    return data;
  } catch (err) {
    console.error('Failed to list members:', err);
    return null;
  }
};

export const inviteMember = async (form: {
  name: string;
  email: string;
  role: string;
}) => {
  try {
    await auth.api.createInvitation({
      body: {
        name: form.name,
        email: form.email,
        role: form.role,
      },
      headers: await headers(),
    });
    return { success: true, error: null };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Failed to invite member';
    return { success: false, error: message };
  }
};

export const updateMemberRole = async (memberId: string, role: string) => {
  try {
    await auth.api.updateMemberRole({
      body: { memberId, role },
      headers: await headers(),
    });
    return { success: true, error: null };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Failed to update member role';
    return { success: false, error: message };
  }
};

export const removeMember = async (memberIdOrEmail: string) => {
  try {
    await auth.api.removeMember({
      body: { memberIdOrEmail },
      headers: await headers(),
    });
    return { success: true, error: null };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Failed to remove member';
    return { success: false, error: message };
  }
};
