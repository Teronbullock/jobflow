'use server';

import { redirect } from 'next/navigation';

import { auth } from '@lib/auth';
import { headers } from 'next/headers';
import { LoginForm, RegForm } from '@/features/auth/schema/auth-forms.schemas';

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

  redirect('/dashboard');
}

export async function signOutAction() {
  await auth.api.signOut({
    headers: await headers(),
  });

  redirect('/');
}
