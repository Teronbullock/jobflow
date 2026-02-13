import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { organization } from 'better-auth/plugins';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { owner, admin, member, ac } from '@/features/auth/lib/permissions';
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
  plugins: [
    nextCookies(),
    organization({
      ac,
      roles: {
        owner,
        admin,
        member,
      },
    }),
  ],
});

export type Session = typeof auth.$Infer.Session;
export type Organization = typeof auth.$Infer.Organization;
