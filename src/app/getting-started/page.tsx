import { GettingStartedForm } from '@/features/getting-started/components/getting-started-form';
import {
  getSession,
  getUserOrganization,
} from '@/features/auth/services/auth-services';
import { redirect } from 'next/navigation';

export default async function gettingStartedPage() {
  const [session, sessionError] = await getSession();
  const [hasOrg, userOrgErr] = await getUserOrganization();

  if (!session || sessionError || userOrgErr) {
    console.error(sessionError, userOrgErr);
    return null;
  }

  if (hasOrg && hasOrg.length > 0) {
    redirect('/dashboard');
  }

  return (
    <div>
      <GettingStartedForm />
    </div>
  );
}
