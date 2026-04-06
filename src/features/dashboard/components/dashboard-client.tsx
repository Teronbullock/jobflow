'use client';
import { useSearchParams } from 'next/navigation';
import { JobsProvider } from '@/context/jobs-context';
import { ScheduleView } from '@/features/schedule/components/ScheduleView';
import { InvoiceView } from '@/features/invoice/components/InvoiceView';

export function DashboardClient() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'schedule';

  return (
    <JobsProvider>
      {activeTab === 'schedule' ? <ScheduleView /> : <InvoiceView />}
    </JobsProvider>
  );
}
