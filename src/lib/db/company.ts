import 'server-only';
import { db } from '@/db/db';
import { companies } from '@/db/schema/company-schema';
import { eq } from 'drizzle-orm';

export async function getCompany(userId: string) {
  const results = await db
    .select()
    .from(companies)
    .where(eq(companies.userId, userId));

  return results;
}
