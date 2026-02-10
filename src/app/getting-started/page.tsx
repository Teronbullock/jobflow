import { GettingStartedForm } from '@/features/getting-started/components/getting-started-form';
import { getSession, auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function gettingStartedPage() {
  const auth = await getSession();

  if (!auth) {
    redirect('/');
  }

  const { companyId } = auth?.user;

  if (companyId !== null) {
    redirect('/dashboard?tab=schedule');
  }

  return (
    <div>
      <GettingStartedForm />
    </div>
  );
}
