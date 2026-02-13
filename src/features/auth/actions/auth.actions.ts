'use server';

import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth/auth';
import { headers } from 'next/headers';
import { RegAuth, type BaseAuth } from '@/features/auth/validation/auth.schema';
import { refresh } from 'next/cache';

export async function signUpAction(formData: RegAuth) {
  const rawData = {
    name: String(formData.name ?? ''),
    email: String(formData.email ?? ''),
    password: String(formData.password ?? ''),
    passwordConfirm: String(formData.passwordConfirm ?? ''),
  };

  await auth.api.signUpEmail({ body: rawData });

  redirect('/dashboard?tab=schedule');
  refresh();
}

export async function loginAction(formData: BaseAuth) {
  const rawData = {
    email: String(formData.email ?? ''),
    password: String(formData.password ?? ''),
  };

  await auth.api.signInEmail({ body: rawData });

  redirect('/dashboard?tab=schedule');
  refresh();
}

export async function signOutAction() {
  await auth.api.signOut({
    headers: await headers(),
  });

  redirect('/');
  refresh();
}
