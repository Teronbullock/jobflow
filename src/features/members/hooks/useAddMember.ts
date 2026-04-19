'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { inviteMember, addMember } from '../actions/members.actions';
import { addMemberAction } from '@/features/auth/actions/auth-actions';
import {
  addMemberSchema,
  inviteMemberSchema,
  type AddMemberForm,
  type InviteMemberForm,
} from '../validation/member.schema';

type AddMemberMode = 'add' | 'invite';

interface UseAddMemberProps {
  mode: AddMemberMode;
  setAddModalOpen: (open: boolean) => void;
}

export const useAddMember = ({ mode, setAddModalOpen }: UseAddMemberProps) => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddMemberForm | InviteMemberForm>({
    resolver: zodResolver(
      mode === 'add' ? addMemberSchema : inviteMemberSchema,
    ),
    defaultValues: { role: 'member' },
  });

  const onFormSubmit: SubmitHandler<
    AddMemberForm | InviteMemberForm
  > = async data => {
    try {
      if (mode === 'add') {
        const result = await addMemberAction(data as AddMemberForm);

        if (result.success) {
          setAddModalOpen(false);
          reset();
        } else {
          setError('root', { message: result.error ?? 'Something went wrong' });
        }
      } else {
        const result = await inviteMember(data as InviteMemberForm);
        if (result.success) {
          setAddModalOpen(false);
          reset();
        } else {
          setError('root', { message: result.error ?? 'Something went wrong' });
        }
      }
    } catch {
      setError('root', { message: 'Something went wrong' });
    }
  };

  const handleClose = () => {
    setAddModalOpen(false);
    reset();
  };

  return {
    register,
    handleSubmit,
    onFormSubmit,
    errors,
    isSubmitting,
    handleClose,
  };
};
