'use client';

import { useCrewModal } from '../hooks/index';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Modal } from '@/components/ui/modal';

interface AddCrewModalProps {
  onClose: () => void;
}

export function AddCrewModal({ onClose }: AddCrewModalProps) {
  const { register, handleSubmit, onSubmit, errors } = useCrewModal(onClose);

  // console.log('errors', errors, 'ROOT', errors.root);
  return (
    <Modal
      onClose={onClose}
      handleSubmit={handleSubmit(onSubmit)}
      headerText='Add New Job'
    >
      <div className='flex flex-col gap-6'>
        <div>
          <Label className='mb-3' htmlFor='client'>
            Crew Member Name
          </Label>
          <Input id='name' placeholder='e.g., Mike' {...register('name')} />
          {errors.name && (
            <span className='text-red-500'>{errors.name.message}</span>
          )}
        </div>
        <div>
          <Label className='mb-3' htmlFor='email'>
            Email
          </Label>
          <Input
            id='email'
            placeholder='name@domain.com'
            {...register('email')}
          />
          {errors.email && (
            <span className='text-red-500'>{errors.email.message}</span>
          )}
        </div>
        <div className='flex gap-3 pt-2'>
          <Button type='submit' className='flex-1'>
            Add crew member
          </Button>
          <Button
            type='button'
            variant='outline'
            onClick={onClose}
            className='flex-1 bg-transparent'
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}
