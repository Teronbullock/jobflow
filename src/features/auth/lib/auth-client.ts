import { createAuthClient } from 'better-auth/react';
import { organizationClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  baseURL: 'http://localhost:3000',
  plugins: [organizationClient()],
});

export const { signIn, signUp, useSession, signOut } = authClient;

export type AuthSession = typeof authClient.$Infer.Session;
export type ActiveOrganization = typeof authClient.$Infer.Organization;
