'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  updateMemberRoleSchema,
  type UpdateMemberRoleForm,
} from '../validation/member.schema';
import type { MembersResponse } from '../types';

interface EditMemberModalProps {
  member: MembersResponse;
  onClose: () => void;
  onSubmit: (
    memberId: string,
    role: string,
  ) => Promise<{ success: boolean; error: string | null }>;
}

export function EditMemberModal({
  member,
  onClose,
  onSubmit,
}: EditMemberModalProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UpdateMemberRoleForm>({
    resolver: zodResolver(updateMemberRoleSchema),
    defaultValues: { role: member.role as 'owner' | 'admin' | 'member' },
  });

  const onFormSubmit: SubmitHandler<UpdateMemberRoleForm> = async data => {
    const result = await onSubmit(member.id, data.role);
    if (result.success) onClose();
    else setError('root', { message: result.error ?? 'Something went wrong' });
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <div className='w-full max-w-md rounded-xl border border-border bg-card'>
        <div className='flex items-center justify-between border-b border-border p-4'>
          <h2 className='text-lg font-semibold text-foreground'>
            Edit member — {member.user.name}
          </h2>
          <button
            type='button'
            onClick={onClose}
            className='text-muted-foreground hover:text-foreground'
            aria-label='Close'
          >
            ×
          </button>
        </div>
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className='flex flex-col gap-4 p-4'
        >
          {errors.root && (
            <p className='text-sm text-destructive'>{errors.root.message}</p>
          )}
          <p className='text-sm text-muted-foreground'>{member.user.email}</p>
          <div>
            <label
              htmlFor='role'
              className='mb-1 block text-sm font-medium text-foreground'
            >
              Role
            </label>
            <select
              id='role'
              className='w-full rounded-md border border-border bg-background px-3 py-2 text-foreground'
              {...register('role')}
            >
              <option value='member'>Member</option>
              <option value='admin'>Admin</option>
              <option value='owner'>Owner</option>
            </select>
            {errors.role && (
              <p className='mt-1 text-sm text-destructive'>
                {errors.role.message}
              </p>
            )}
          </div>
          <div className='flex gap-3 pt-2'>
            <button
              type='submit'
              disabled={isSubmitting}
              className='flex-1 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 disabled:opacity-50'
            >
              {isSubmitting ? 'Saving…' : 'Save'}
            </button>
            <button
              type='button'
              onClick={onClose}
              className='flex-1 rounded-md border border-border bg-transparent px-4 py-2 text-foreground hover:bg-muted'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
