'use server';

import { db } from '@/db/db';
import { companies } from '@/db/schema/company-schema';
import { auth } from '@/lib/auth/auth';
import { headers } from 'next/headers';

export const createCompany = async (companyName: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error('User not authenticated');
  }

  const newCompany = await db
    .insert(companies)
    .values({
      name: companyName,
      userId: session.user.id,
    })
    .returning();

  return newCompany;
};
