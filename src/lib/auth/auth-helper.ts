import 'server-only';
import { headers } from 'next/headers';
import { auth } from './auth';

/**
 * # getSessions
 *
 * This functions wraps the better-auth getSession method with a tryCatch.
 */
export const getSession = async () => {
  try {
    const data = await auth.api.getSession({
      headers: await headers(),
    });

    if (!data) {
      return null;
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
