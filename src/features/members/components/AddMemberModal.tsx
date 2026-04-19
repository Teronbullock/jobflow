'use client';

import { useState } from 'react';
import { useAddMember } from '../hooks/useAddMember';

type ModalMode = 'add' | 'invite';

interface AddMemberModalProps {
  modalStatus: {
    addModalOpen: boolean;
    setAddModalOpen: (addModalOpen: boolean) => void;
  };
}

export function AddMemberModal({ modalStatus }: AddMemberModalProps) {
  const { addModalOpen, setAddModalOpen } = modalStatus;
  const [mode, setMode] = useState<ModalMode>('add');

  const {
    register,
    handleSubmit,
    onFormSubmit,
    errors,
    handleClose,
    isSubmitting,
  } = useAddMember({ mode, setAddModalOpen });

  if (!addModalOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <div className='w-full max-w-md rounded-xl border border-border bg-card'>
        <div className='flex items-center justify-between border-b border-border p-4'>
          <h2 className='text-lg font-semibold text-foreground'>
            {mode === 'add' ? 'Add member' : 'Send invitation'}
          </h2>
          <button
            type='button'
            onClick={handleClose}
            className='text-muted-foreground hover:text-foreground'
            aria-label='Close'
          >
            ×
          </button>
        </div>

        <div className='flex border-b border-border'>
          <button
            type='button'
            onClick={() => setMode('add')}
            className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
              mode === 'add'
                ? 'border-b-2 border-red-500 text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Add member
          </button>
          <button
            type='button'
            onClick={() => setMode('invite')}
            className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
              mode === 'invite'
                ? 'border-b-2 border-red-500 text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Send invitation
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className='flex flex-col gap-4 p-4'
        >
          {errors.root && (
            <p className='text-sm text-destructive'>{errors.root.message}</p>
          )}

          {mode === 'add' && (
            <>
              <div>
                <label
                  htmlFor='name'
                  className='mb-1 block text-sm font-medium text-foreground'
                >
                  Name
                </label>
                <input
                  id='name'
                  type='text'
                  placeholder='John Doe'
                  className='w-full rounded-md border border-border bg-background px-3 py-2 text-foreground'
                  {...register('name')}
                />
                {errors.name && (
                  <p className='mt-1 text-sm text-destructive'>
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor='email'
                  className='mb-1 block text-sm font-medium text-foreground'
                >
                  Email
                </label>
                <input
                  id='email'
                  type='email'
                  placeholder='name@example.com'
                  className='w-full rounded-md border border-border bg-background px-3 py-2 text-foreground'
                  {...register('email')}
                />
                {errors.email && (
                  <p className='mt-1 text-sm text-destructive'>
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor='password'
                  className='mb-1 block text-sm font-medium text-foreground'
                >
                  Password
                </label>
                <input
                  id='password'
                  type='password'
                  placeholder='••••••••'
                  className='w-full rounded-md border border-border bg-background px-3 py-2 text-foreground'
                  {...register('password')}
                />
                {'password' in errors && errors.password && (
                  <p className='mt-1 text-sm text-destructive'>
                    {errors.password.message}
                  </p>
                )}
              </div>
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
            </>
          )}

          {mode === 'invite' && (
            <>
              <div>
                <label
                  htmlFor='name'
                  className='mb-1 block text-sm font-medium text-foreground'
                >
                  Name{' '}
                  <span className='text-muted-foreground font-normal'>
                    (optional)
                  </span>
                </label>
                <input
                  id='name'
                  type='text'
                  placeholder='John Doe'
                  className='w-full rounded-md border border-border bg-background px-3 py-2 text-foreground'
                  {...register('name')}
                />
                {errors.name && (
                  <p className='mt-1 text-sm text-destructive'>
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor='email'
                  className='mb-1 block text-sm font-medium text-foreground'
                >
                  Email
                </label>
                <input
                  id='email'
                  type='email'
                  placeholder='name@example.com'
                  className='w-full rounded-md border border-border bg-background px-3 py-2 text-foreground'
                  {...register('email')}
                />
                {errors.email && (
                  <p className='mt-1 text-sm text-destructive'>
                    {errors.email.message}
                  </p>
                )}
              </div>
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
            </>
          )}

          <div className='flex gap-3 pt-2'>
            <button
              type='submit'
              disabled={isSubmitting}
              className='flex-1 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 disabled:opacity-50'
            >
              {isSubmitting
                ? 'Sending…'
                : mode === 'add'
                  ? 'Add member'
                  : 'Send invitation'}
            </button>
            <button
              type='button'
              onClick={handleClose}
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
