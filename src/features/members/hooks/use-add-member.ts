'use client';

import { useTransition } from 'react';
import { inviteMember } from '../actions/members.actions';
import { useFetchMembers } from './use-fetch-members';
import { useAddMemberModal } from './use-add-member-modal';

interface UseAddMemberProps {
  orgId: string;
}

export const useAddMember = ({ orgId }: UseAddMemberProps) => {
  const { members } = useFetchMembers({ orgId });
  const { addModalOpen, setAddModalOpen } = useAddMemberModal();
  const [isPending, startTransition] = useTransition();

  const handleInvite = async (form: {
    name: string;
    email: string;
    role: string;
  }) => {
    const result = await inviteMember(form);
    if (result.success) {
      setAddModalOpen(false);
    }
    return result;
  };

  return {
    members,
    addModalOpen,
    setAddModalOpen,
    handleInvite,
  };
};
