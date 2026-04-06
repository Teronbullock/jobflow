'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { inviteMember } from '../actions/members.actions';
import { useAddMemberModal } from './useAddMemberModal';
import {
  inviteMemberSchema,
  type InviteMemberForm,
} from '../validation/member.schema';

export const useAddMember = () => {
  const { addModalOpen, setAddModalOpen } = useAddMemberModal();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InviteMemberForm>({
    resolver: zodResolver(inviteMemberSchema),
    defaultValues: { role: 'member' },
  });

  const onFormSubmit: SubmitHandler<InviteMemberForm> = async data => {
    const result = await inviteMember(data);
    if (result.success) {
      setAddModalOpen(false);
      reset();
    } else {
      setError('root', { message: result.error ?? 'Something went wrong' });
    }
    return result;
  };

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

  const handleClose = () => {
    setAddModalOpen(false);
    reset();
  };

  return {
    addModalOpen,
    setAddModalOpen,
    handleInvite,
    register,
    handleSubmit,
    onFormSubmit,
    errors,
    isSubmitting,
    handleClose,
  };
};
