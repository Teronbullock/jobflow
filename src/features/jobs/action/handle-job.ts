'use server';

import { db } from '@/db/db';
import { jobs } from '@/db/schema/job-schema';
import { type JobSchema } from '@/lib/validations/schemas/job.schemas';
import { auth } from '@/lib/auth/auth';
import { headers } from 'next/headers';

export const postAddJob = async (data: JobSchema) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    throw new Error('Unauthorized');
  }

  const dataInfo: typeof jobs = {
    ...data,
    userId: session?.user.id,
    company_id: session.company.id,
  };

  try {
    const newJob = await db.insert(jobs).values(dataInfo).returning();
    return newJob[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
