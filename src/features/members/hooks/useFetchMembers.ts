'use client';

import { useQuery } from '@tanstack/react-query';
import { getMembers } from '../actions/members.actions';

interface UseFetchMembersProps {
  orgId: string;
}

export const useFetchMembers = ({ orgId }: UseFetchMembersProps) => {
  const { data, ...queryResult } = useQuery({
    queryKey: ['members', orgId],
    queryFn: () => getMembers(orgId),
  });

  return {
    members: data?.members ?? [],
    totalMembers: data?.total ?? 0,
    ...queryResult,
  };
};
