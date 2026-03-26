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
      {activeTab === 'schedule' ? <ScheduleView /> : <InvoiceView />}
    </JobsProvider>
  );
}
