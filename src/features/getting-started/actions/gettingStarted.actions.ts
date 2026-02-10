'use server';

import { db } from '@/db/db';
import { company } from '@/db/schema/company.schema';
import { user } from '@/db/schema/auth.schema';
import { auth } from '@/lib/auth/auth';
import { headers } from 'next/headers';
import { eq } from 'drizzle-orm';

export const checkUserCompany = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return false;
  }

  try {
    const userRecord = await db
      .select()
      .from(user)
      .where(eq(user.id, session.user.id))
      .limit(1);

    return userRecord.length > 0 && userRecord[0].companyId !== null;
  } catch (err) {
    console.error('Error checking user company:', err);
    return false;
  }
};

export const createCompany = async (companyName: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error('User not authenticated');
  }

  try {
    const newCompany = await db
      .insert(company)
      .values({
        name: companyName,
      })
      .returning();

    return newCompany;
  } catch (err) {
    console.error('Error creating company:', err);
    return null;
  }
};

export const updateUserCompanyId = async (companyId: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user?.id;

  if (!userId) {
    throw new Error('User not authenticated');
  }

  try {
    const res = await db
      .update(user)
      .set({
        companyId: companyId,
      })
      .where(eq(user.id, userId))
      .returning();

    return res;
  } catch (err) {
    console.error('Error updating user company ID:', err);

    return null;
  }
};
