'use server';

import { auth } from '@/features/auth/lib/auth';
import { headers } from 'next/headers';

export const createCompany = async (companyName: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error('User not authenticated');
  }

  try {
    const data = await auth.api.createOrganization({
      headers: await headers(),
      body: {
        name: companyName,
        slug: companyName.toLowerCase().replace(/\s+/g, '-'),
        userId: session.user.id,
        keepCurrentActiveOrganization: false,
      },
    });

    if (!data) {
      throw new Error('API failed to return a response');
    }

    return data;
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));

    console.error('Error creating company:', error);
    return null;
  }
};
