'use server';

import { z } from 'zod';
import { auth } from '@/features/auth/lib/auth';
import { headers } from 'next/headers';
import {
  regAuthSchema,
  baseAuthSchema,
} from '@/features/auth/validation/auth.schema';
import { addMemberSchema } from '@/features/members/validation/member.schema';
import {
  getSession,
  getUserOrganization,
} from '@/features/auth/services/auth.service';

export async function signUpAction(formData: unknown) {
  const parsed = regAuthSchema.safeParse(formData);

  if (!parsed.success) {
    const flattened = z.flattenError(parsed.error);
    return {
      success: false,
      error: flattened.fieldErrors,
    };
  }

  const [session, sessionError] = await getSession();
  if (sessionError || !session) {
    return {
      success: false,
      error: { global: 'User verification failed. Please try again.' },
    };
  }

  await auth.api.signUpEmail({ body: parsed.data });

  return { success: true, error: null };
}

export async function loginAction(formData: unknown) {
  const parsed = baseAuthSchema.safeParse(formData);

  if (!parsed.success) {
    const flattened = z.flattenError(parsed.error);
    return {
      success: false,
      error: flattened.fieldErrors,
    };
  }

  await auth.api.signInEmail({ body: parsed.data });

  return { success: true, error: null };
}

export async function signOutAction() {
  await auth.api.signOut({
    headers: await headers(),
  });

  return { success: true, error: null };
}

export async function addMemberAction(formData: unknown) {
  const parsed = addMemberSchema.safeParse(formData);

  if (!parsed.success) {
    const flattened = z.flattenError(parsed.error);
    return {
      success: false,
      error: flattened.fieldErrors,
    };
  }

  const userResponse = await auth.api.signUpEmail({
    body: {
      name: parsed.data.name,
      email: parsed.data.email,
      password: parsed.data.password,
    },
  });

  if (!userResponse.user) {
    return {
      success: false,
      error: { general: 'Failed to create user.' },
    };
  }

  const [session, sessionErr] = await getSession();

  if (sessionErr || !session?.user?.id) {
    return {
      success: false,
      error: { general: 'You must be logged in to add a member.' },
    };
  }

  const [organizations, orgErr] = await getUserOrganization();

  if (orgErr || !organizations || organizations.length === 0) {
    return {
      success: false,
      error: { general: 'No organization found for the current user.' },
    };
  }

  const currentOrgId = organizations[0].id;

  await auth.api.addMember({
    body: {
      userId: userResponse.user.id,
      role: [parsed.data.role],
      organizationId: currentOrgId,
    },
    headers: await headers(),
  });

  return { success: true, error: null };
}
