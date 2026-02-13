'use server';

import { db } from '@/db/db';

import { user } from '@/db/schema/auth-schema';
import { auth } from '@/features/auth/lib/auth';
import { headers } from 'next/headers';
import { eq } from 'drizzle-orm';

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

// export const checkUserCompany = async () => {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   if (!session?.user?.id) {
//     return false;
//   }

//   try {
//     const userRecord = await db
//       .select()
//       .from(user)
//       .where(eq(user.id, session.user.id))
//       .limit(1);

//     // return userRecord.length > 0 && userRecord[0].companyId !== null;
//   } catch (err) {
//     console.error('Error checking user company:', err);
//     return false;
//   }
// };

// export const updateUserCompanyId = async (companyId: string) => {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   const userId = session?.user?.id;

//   if (!userId) {
//     throw new Error('User not authenticated');
//   }

//   try {
//     const res = await db
//       .update(user)
//       .set({
//         companyId: companyId,
//       })
//       .where(eq(user.id, userId))
//       .returning();

//     return res;
//   } catch (err) {
//     console.error('Error updating user company ID:', err);

//     return null;
//   }
// };
