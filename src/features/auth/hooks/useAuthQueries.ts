'use client';

import { useSession } from '@/features/auth/lib/auth-client';
import { useQuery } from '@tanstack/react-query';

export const useAuthQueries = () => {
  const query = useQuery({
    queryKey: ['session'],
    queryFn: useSession,
  });

  return {
    query,
  };
};
