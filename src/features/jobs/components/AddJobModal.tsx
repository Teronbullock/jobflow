'use client';

import { useJobModal } from '@/features/jobs/hooks/useJobModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Modal } from '@/components/ui/modal';

interface AddJobModalProps {
  onClose: () => void;
}

export function AddJobModal({ onClose }: AddJobModalProps) {
  const { register, handleSubmit, onSubmit, watch, crewMembers, errors } =
    useJobModal(onClose);
  console.log('errors', errors, 'ROOT', errors.root);
  return (
    <Modal
      onClose={onClose}
      handleSubmit={handleSubmit(onSubmit)}
      headerText='Add New Job'
    >
      <div>
        <Label htmlFor='client'>Client Name</Label>
        <Input
          id='clientName'
          placeholder='e.g., Johnson Family'
          {...register('clientName')}
        />
        {errors.clientName && (
          <span className='text-red-500'>{errors.clientName.message}</span>
        )}
      </div>
      <div>
        <Label htmlFor='address'>Address</Label>
        <Input
          id='address'
          placeholder='e.g., 123 Oak Street'
          {...register('address')}
        />
        {errors.address && (
          <span className='text-red-500'>{errors.address.message}</span>
        )}
      </div>
      <div>
        <Label htmlFor='description'>Job Description</Label>
        <Input
          id='description'
          placeholder='e.g., Weekly lawn maintenance'
          {...register('description')}
        />
        {errors.description && (
          <span className='text-red-500'>{errors.description.message}</span>
        )}
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <Label htmlFor='date'>Date</Label>
          <Input id='date' type='date' {...register('date')} />
          {errors.date && (
            <span className='text-red-500'>{errors.date.message}</span>
          )}
        </div>
        <div>
          <Label htmlFor='time'>Time</Label>
          <Input id='time' type='time' {...register('time')} />
          {errors.time && (
            <span className='text-red-500'>{errors.time.message}</span>
          )}
        </div>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <Label htmlFor='assignedTo'>Assign To</Label>
          <select
            id='assignedTo'
            className='w-full h-10 px-3 rounded-md border border-input bg-background text-sm'
            {...register('assignedTo')}
          >
            {crewMembers.map(member => (
              <option key={member} value={member}>
                {member}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor='amount'>Amount ($)</Label>
          <Input
            id='amount'
            type='number'
            placeholder='150'
            {...register('amount')}
          />
          {errors.amount && (
            <span className='text-red-500'>{errors.amount.message}</span>
          )}
        </div>
        {/* {errors && <span className='text-red-500'>{errors.root.message}</span>} */}
      </div>
      <div className='flex gap-3 pt-2'>
        <Button
          type='button'
          variant='outline'
          onClick={onClose}
          className='flex-1 bg-transparent'
        >
          Cancel
        </Button>
        <Button type='submit' className='flex-1'>
          Add Job
        </Button>
      </div>
    </Modal>
  );
}
