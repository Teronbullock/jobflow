import { betterAuth } from 'better-auth';
import { customSession } from 'better-auth/plugins';
import { nextCookies } from 'better-auth/next-js';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { eq } from 'drizzle-orm';
import { db } from '@db/db';
import * as schema from '@/db/schema/auth-schema';
import { companies } from '@/db/schema/company-schema';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  signUp: {
    additionalFields: {
      role: {
        type: 'string',
        input: false,
      },
    },
  },
  social: {
    additionalFields: {
      role: {
        type: 'string',
        input: false,
      },
    },
  },
  plugins: [
    nextCookies(),
    customSession(async ({ user, session }) => {
      const companyId = await db
        .select({ id: companies.id })
        .from(companies)
        .where(eq(companies.userId, user.id));

      return {
        company: {
          id: companyId[0].id,
        },
        user: {
          ...user,
          newField: 'newField',
        },
        session,
      };
    }),
  ],
});

export type User = typeof auth.$Infer.Session.user;
export type Session = typeof auth.$Infer.Session.session;
export type AuthData = { session: Session; user: User } | null;
