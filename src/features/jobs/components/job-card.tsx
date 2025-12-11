'use client';

import { useJobs, type Job } from '@/context/jobs-context';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, User, Check, Play, FileText } from 'lucide-react';

interface JobCardProps {
  job: Job;
  showDate?: boolean;
}

export function JobCard({ job, showDate }: JobCardProps) {
  const { updateJobStatus, createInvoice } = useJobs();

  const statusConfig = {
    scheduled: {
      label: 'Scheduled',
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    },
    'in-progress': {
      label: 'In Progress',
      color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    },
    completed: {
      label: 'Completed',
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
    invoiced: { label: 'Invoiced', color: 'bg-muted text-muted-foreground' },
  };

  const handleStatusChange = () => {
    if (job.status === 'scheduled') {
      updateJobStatus(job.id, 'in-progress');
    } else if (job.status === 'in-progress') {
      updateJobStatus(job.id, 'completed');
    } else if (job.status === 'completed') {
      createInvoice(job.id);
    }
  };

  const getActionButton = () => {
    switch (job.status) {
      case 'scheduled':
        return (
          <Button size='sm' variant='outline' onClick={handleStatusChange}>
            <Play className='w-3 h-3 mr-1' />
            Start
          </Button>
        );
      case 'in-progress':
        return (
          <Button size='sm' onClick={handleStatusChange}>
            <Check className='w-3 h-3 mr-1' />
            Complete
          </Button>
        );
      case 'completed':
        return (
          <Button size='sm' variant='default' onClick={handleStatusChange}>
            <FileText className='w-3 h-3 mr-1' />
            Invoice
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className='bg-card border border-border rounded-xl p-4 hover:shadow-sm transition-shadow'>
      <div className='flex items-start justify-between gap-4'>
        <div className='flex-1 min-w-0'>
          <div className='flex items-center gap-2 mb-1'>
            <h3 className='font-semibold text-foreground truncate'>
              {job.client}
            </h3>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                statusConfig[job.status].color
              }`}
            >
              {statusConfig[job.status].label}
            </span>
          </div>
          <p className='text-sm text-muted-foreground mb-2'>
            {job.description}
          </p>
          <div className='flex flex-wrap items-center gap-3 text-sm text-muted-foreground'>
            <span className='flex items-center gap-1'>
              <MapPin className='w-3.5 h-3.5' />
              {job.address}
            </span>
            <span className='flex items-center gap-1'>
              <Clock className='w-3.5 h-3.5' />
              {showDate && `${job.date} `}
              {job.time}
            </span>
            <span className='flex items-center gap-1'>
              <User className='w-3.5 h-3.5' />
              {job.assignedTo}
            </span>
          </div>
        </div>
        <div className='flex flex-col items-end gap-2'>
          <span className='font-semibold text-foreground'>${job.amount}</span>
          {getActionButton()}
        </div>
      </div>
    </div>
  );
}
