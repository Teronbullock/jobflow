'use client';

import { useSession } from '@/lib/auth/auth-client';
import { ScheduleView } from '@/features/schedule/components/schedule-view';
import { InvoiceView } from '@/features/invoice/components/invoice-view';
import { JobsProvider } from '@/context/jobs-context';
import { useSearchParams, useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';

export default function Dashboard() {
  const { data: session, isPending } = useSession();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'schedule';
  const router = useRouter();

  if (isPending) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <Spinner />
        Loading...
      </div>
    );
  }

  if (!session) {
    <div>You are not authorized to view this page.</div>;
    router.push('/login');
    return;
  }

  return (
    <JobsProvider>
      <div className='min-h-screen bg-background'>
        <main className='max-w-7xl mx-auto px-4 py-6'>
          {activeTab === 'schedule' ? <ScheduleView /> : <InvoiceView />}
        </main>
      </div>
    </JobsProvider>
  );
}
