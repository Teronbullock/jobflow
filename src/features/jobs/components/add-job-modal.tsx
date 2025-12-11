'use client';

import type React from 'react';

import { useState } from 'react';
import { useJobs } from '@/context/jobs-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

interface AddJobModalProps {
  onClose: () => void;
}

export function AddJobModal({ onClose }: AddJobModalProps) {
  const { addJob, crewMembers } = useJobs();
  const [formData, setFormData] = useState({
    client: '',
    address: '',
    description: '',
    assignedTo: crewMembers[0],
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    amount: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addJob({
      ...formData,
      amount: Number.parseFloat(formData.amount) || 0,
      status: 'scheduled',
    });
    onClose();
  };

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'>
      <div className='bg-card border border-border rounded-xl w-full max-w-md'>
        <div className='flex items-center justify-between p-4 border-b border-border'>
          <h2 className='text-lg font-semibold text-foreground'>Add New Job</h2>
          <button
            onClick={onClose}
            className='text-muted-foreground hover:text-foreground'
          >
            <X className='w-5 h-5' />
          </button>
        </div>
        <form onSubmit={handleSubmit} className='p-4 space-y-4'>
          <div>
            <Label htmlFor='client'>Client Name</Label>
            <Input
              id='client'
              value={formData.client}
              onChange={e =>
                setFormData({ ...formData, client: e.target.value })
              }
              placeholder='e.g., Johnson Family'
              required
            />
          </div>
          <div>
            <Label htmlFor='address'>Address</Label>
            <Input
              id='address'
              value={formData.address}
              onChange={e =>
                setFormData({ ...formData, address: e.target.value })
              }
              placeholder='e.g., 123 Oak Street'
              required
            />
          </div>
          <div>
            <Label htmlFor='description'>Job Description</Label>
            <Input
              id='description'
              value={formData.description}
              onChange={e =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder='e.g., Weekly lawn maintenance'
              required
            />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='date'>Date</Label>
              <Input
                id='date'
                type='date'
                value={formData.date}
                onChange={e =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor='time'>Time</Label>
              <Input
                id='time'
                type='time'
                value={formData.time}
                onChange={e =>
                  setFormData({ ...formData, time: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='assignedTo'>Assign To</Label>
              <select
                id='assignedTo'
                value={formData.assignedTo}
                onChange={e =>
                  setFormData({ ...formData, assignedTo: e.target.value })
                }
                className='w-full h-10 px-3 rounded-md border border-input bg-background text-sm'
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
                value={formData.amount}
                onChange={e =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                placeholder='150'
                required
              />
            </div>
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
        </form>
      </div>
    </div>
  );
}
