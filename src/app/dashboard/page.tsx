import { getSession } from '@/lib/auth/auth-helper';
import { redirect } from 'next/navigation';
import { DashboardClient } from '@/features/dashboard/components/index';

export default async function DashboardPage() {
  const auth = await getSession();

  if (!auth) {
    redirect('/');
  }

  const { companyId } = auth.user;

  if (!companyId) {
    redirect('/getting-started');
  }

  return (
    <DashboardClient
    // session={session}
    />
  );
}
