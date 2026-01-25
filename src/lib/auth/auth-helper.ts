import 'server-only';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth/auth';

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
