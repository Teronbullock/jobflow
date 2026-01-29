import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@db/db';
import * as schema from '@/db/schema/auth-schema';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      companyId: {
        type: 'number',
        input: false,
      },
      role: {
        type: 'string',
        input: false,
      },
    },
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
  plugins: [nextCookies()],
});

export type User = typeof auth.$Infer.Session.user;
export type Session = typeof auth.$Infer.Session.session;
export type AuthData = { session: Session; user: User } | null;
