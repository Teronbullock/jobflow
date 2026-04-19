import 'server-only';

import { headers } from 'next/headers';
import { auth, type Session } from '../lib/auth';
import { Organization } from '@/features/auth/lib/auth';

export const getSession = async (): Promise<[Session | null, Error | null]> => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    return [session, null];
  } catch (err) {
    return [
      null,
      err instanceof Error ? err : new Error('Session fetch failed'),
    ];
  }
};

export const getUserOrganization = async (): Promise<
  [Organization[] | null, Error | null]
> => {
  try {
    const data = await auth.api.listOrganizations({
      headers: await headers(),
    });

    if (!data || data.length === 0) return [[], null];

    return [data, null];
  } catch (err) {
    return [
      null,
      err instanceof Error ? err : new Error('Failed to fetch organizations'),
    ];
  }
};

export const checkPermission = async () => {
  try {
    const data = await auth.api.hasPermission({
      headers: await headers(),
      body: {
        permission: {
          project: ['create'],
        },
      },
    });

    if (!data) return [null, null];

    return [data, null];
  } catch (err) {
    return [
      null,
      err instanceof Error ? err : new Error('Failed to check permission'),
    ];
  }
};
