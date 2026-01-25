'use client';

import { useSearchParams } from 'next/navigation';
import { JobsProvider } from '@/context/jobs-context';
import { ScheduleView } from '@/features/schedule/components/schedule-view';
import { InvoiceView } from '@/features/invoice/components/invoice-view';

export function DashboardClient() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'schedule';

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
