import { GettingStartedForm } from '@/features/getting-started/components/getting-started-form';
import { getSession } from '@/lib/auth/auth-helper';
import { getCompany } from '@/lib/db/company';
import { redirect } from 'next/navigation';

export default async function gettingStartedPage() {
  const auth = await getSession();

  if (!auth) {
    redirect('/');
  }

  const company = await getCompany(auth?.user.id);

  if (company.length > 0) {
    redirect('/dashboard?tab=schedule');
  }

  return (
    <div>
      <GettingStartedForm />
    </div>
  );
}
