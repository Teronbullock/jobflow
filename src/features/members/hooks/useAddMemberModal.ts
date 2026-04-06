'use client';

import { useState } from 'react';

export const useAddMemberModal = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);

  return {
    addModalOpen,
    setAddModalOpen,
  };
};
