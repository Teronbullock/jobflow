'use client';

import { useState } from 'react';

export const useCrewManger = () => {
  const [showCrew, setShowCrew] = useState(false);

  const crewMembers = ['Mike', 'Sarah', 'Tom', 'Lisa'];

  return {
    crewMembers,
    showCrew,
    setShowCrew,
  };
};
