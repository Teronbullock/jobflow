'use server';

import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth/auth';
import { headers } from 'next/headers';
import { LoginForm, RegForm } from '@/features/auth/validation/auth.schema';

export async function signUpAction(formData: RegForm) {
  const rawData = {
    name: String(formData.name ?? ''),
    email: String(formData.email ?? ''),
    password: String(formData.password ?? ''),
    passwordConfirm: String(formData.passwordConfirm ?? ''),
  };

  await auth.api.signUpEmail({ body: rawData });

  redirect('/');
}

export async function loginAction(formData: LoginForm) {
  const rawData = {
    email: String(formData.email ?? ''),
    password: String(formData.password ?? ''),
  };

  await auth.api.signInEmail({ body: rawData });

  redirect('/dashboard?tab=schedule');
}

export async function signOutAction() {
  await auth.api.signOut({
    headers: await headers(),
  });

  redirect('/');
}
