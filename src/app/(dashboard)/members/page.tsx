import { redirect } from 'next/navigation';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import {
  getSession,
  getUserOrganization,
} from '@/features/auth/services/auth.services';
import { getMembers } from '@/features/members/actions/members.actions';
import { MembersView } from '@/features/members/components';

export default async function MembersPage() {
  const [session, sessionErr] = await getSession();
  const [userOrg, userOrgErr] = await getUserOrganization();

  if (sessionErr || userOrgErr || !session) {
    redirect('/');
  }

  if (!userOrg || userOrg.length < 1) {
    redirect('/getting-started');
  }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  const orgId: string = userOrg[0].id as string;

  await queryClient.prefetchQuery({
    queryKey: ['members', orgId],
    queryFn: () => getMembers(orgId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MembersView orgId={orgId} />
    </HydrationBoundary>
  );
}
