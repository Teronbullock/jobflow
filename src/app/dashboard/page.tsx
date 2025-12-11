'use client';

// import { headers } from 'next/headers';
// import { auth } from '@/lib/auth';
import { useSession } from '@/lib/auth/auth-client';

import { useState } from 'react';
import { ScheduleView } from '@/features/schedule/components/schedule-view';
import { InvoiceView } from '@/features/invoice/components/invoice-view';
import { JobsProvider } from '@/context/jobs-context';
// import { AuthProvider } from '@/components/auth-context';
// import { Header } from '@/components/layout/header';

export default function Dashboard() {
  const { data: session } = useSession();
  // const session = await auth.api.getSession({ headers: await headers() });

  const [activeTab, setActiveTab] = useState<'schedule' | 'invoices'>(
    'schedule'
  );

  return (
    <JobsProvider>
      <div className='min-h-screen bg-background'>
        {/* <Header activeTab={activeTab} onTabChange={setActiveTab} /> */}

        <main className='max-w-7xl mx-auto px-4 py-6'>
          {activeTab === 'schedule' ? <ScheduleView /> : <InvoiceView />}
        </main>
      </div>
    </JobsProvider>
  );
}
