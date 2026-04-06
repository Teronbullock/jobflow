import {
  getSession,
  getUserOrganization,
} from '@/features/auth/services/auth-services';
import { redirect } from 'next/navigation';
import { DashboardClient } from '@/features/dashboard/components/index';

export default async function DashboardPage() {
  const [session, sessionError] = await getSession();
  const [userOrg, userOrgErr] = await getUserOrganization();

  if (sessionError || userOrgErr || !session) {
    console.error(sessionError);
    redirect('/');
  }

  if (!userOrg || userOrg.length < 1) {
    redirect('getting-started');
  }

  return <DashboardClient />;
}
