import 'server-only';

import { headers } from 'next/headers';
import { auth, type Session } from './auth';
import { Organization } from '@/features/auth/lib/auth';

/**
 * # getSession
 * * A server-side utility that wraps the `better-auth` session retrieval in a safe
 * try-catch block to prevent runtime crashes during the SSR phase.
 *
 * @returns {Promise<[Session | null, Error | null]>} A tuple where:
 * - [0]: The authenticated `Session` object or `null` if unauthenticated.
 * - [1]: An `Error` object if the fetch failed, otherwise `null`.
 */
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

/**
 * # hasOrganization
 * Fetches the list of organizations the current user belongs to.
 * * @returns {Promise<[Organizations[] | null, Error | null]>}
 * A tuple containing an array of organizations or an error.
 */
export const hasOrganization = async (): Promise<
  [Organization[] | null, Error | null]
> => {
  try {
    const data = await auth.api.listOrganizations({
      headers: await headers(),
    });

    return [data, null];
  } catch (err) {
    return [
      null,
      err instanceof Error ? err : new Error('Organization fetch failed'),
    ];
  }
};

export const hasPermission = async () => {
  try {
    const data = await auth.api.hasPermission({
      headers: await headers(),
      body: {
        permission: {
          project: ['create'],
        },
      },
    });

    if (!data) {
      throw new Error('API failed to return a response');
    }

    return [data, null];
  } catch (err) {
    return [null, err];
  }
};
