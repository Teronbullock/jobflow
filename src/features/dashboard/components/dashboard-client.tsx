'use client';
import { Users } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { JobsProvider } from '@/context/jobs-context';
import { ScheduleView } from '@/features/schedule/components/schedule-view';
import { InvoiceView } from '@/features/invoice/components/invoice-view';
import { SideMenu } from '@/components/layout/Side-menu';
import Link from 'next/link';

export function DashboardClient() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'schedule';

  return (
    <JobsProvider>
      <div className='min-h-screen bg-background'>
        <main className='max-w-7xl mx-auto px-4 flex gap-6'>
          <SideMenu className='w-[10%] bg-gray-600 text-white p-4'>
            <div className='flex align-middle justify-center'>
              <Link href='/members'>
                <Users />
              </Link>
            </div>
          </SideMenu>
          <section className='w-full py-6'>
            {activeTab === 'schedule' ? <ScheduleView /> : <InvoiceView />}
          </section>
        </main>
      </div>
    </JobsProvider>
  );
}
