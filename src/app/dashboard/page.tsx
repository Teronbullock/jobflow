import { getSession, hasOrganization } from '@/features/auth/lib/auth-helper';
import { redirect } from 'next/navigation';
import { DashboardClient } from '@/features/dashboard/components/index';

export default async function DashboardPage() {
  const [session, sessionError] = await getSession();
  const [hasOrg, orgErr] = await hasOrganization();

  if (sessionError || orgErr || !session) {
    console.error(sessionError);
    redirect('/');
  }

  if (!hasOrg || hasOrg.length < 1) {
    redirect('getting-started');
  }

  return <DashboardClient />;
}
