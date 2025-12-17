// 'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface useHeaderProps {
  activeTab: string | null;
}

export function useHeader({ activeTab }: useHeaderProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const router = useRouter();

  function scheduleHandler() {
    if (activeTab === 'schedule') {
      return;
    }

    router.push('/dashboard?tab=schedule');
  }

  function invoicesHandler() {
    if (activeTab === 'invoices') {
      return;
    }

    router.push('/dashboard?tab=invoices');
  }

  return {
    showLoginModal,
    setShowLoginModal,
    scheduleHandler,
    invoicesHandler,
  };
}
