import { GettingStartedForm } from '@/features/getting-started/components/getting-started-form';
import { getSession, hasOrganization } from '@/features/auth/lib/auth-helper';
import { redirect } from 'next/navigation';

export default async function gettingStartedPage() {
  const [session, sessionError] = await getSession();
  const [hasOrg, orgErr] = await hasOrganization();

  if (!session || sessionError || orgErr) {
    console.error(sessionError, orgErr);
    return null;
  }

  if (Array.isArray(hasOrg) && hasOrg.length > 0) {
    redirect('/dashboard');
  }

  return (
    <div>
      <GettingStartedForm />
    </div>
  );
}
