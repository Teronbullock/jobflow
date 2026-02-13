'use client';

import { JobCard, AddJobModal } from '@/features/jobs/components';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useSchedule } from '../hooks/useSchedule';
import { CrewStatus } from '@/features/crew/components/index';

export function ScheduleView() {
  const {
    showAddJob,
    setShowAddJob,
    selectedCrew,
    setSelectedCrew,
    crewMembers,
    todayJobs,
    upcomingJobs,
    completedJobs,
    getCrewStatus,
  } = useSchedule();

  return (
    <div className='space-y-6'>
      <CrewStatus
        selectedCrew={selectedCrew}
        setSelectedCrew={setSelectedCrew}
        crewMembers={crewMembers}
        getCrewStatus={getCrewStatus}
        setShowAddJob={setShowAddJob}
      />
      {/* Today's Schedule */}
      <div>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-lg font-semibold text-foreground'>
            Today&apos;s Jobs
            {selectedCrew !== 'all' && (
              <span className='text-muted-foreground font-normal'>
                {' '}
                - {selectedCrew}
              </span>
            )}
          </h2>
          <Button onClick={() => setShowAddJob(true)} size='sm'>
            <Plus className='w-4 h-4 mr-1' />
            Add Job
          </Button>
        </div>
        {todayJobs.length === 0 ? (
          <div className='bg-card border border-border rounded-xl p-8 text-center'>
            <p className='text-muted-foreground'>No jobs scheduled for today</p>
          </div>
        ) : (
          <div className='grid gap-3'>
            {todayJobs
              .sort((a, b) => a.time.localeCompare(b.time))
              .map(job => (
                <JobCard key={job.id} job={job} />
              ))}
          </div>
        )}
      </div>

      {/* Upcoming Jobs */}
      {upcomingJobs.length > 0 && (
        <div>
          <h2 className='text-lg font-semibold text-foreground mb-4'>
            Upcoming
          </h2>
          <div className='grid gap-3'>
            {upcomingJobs
              .sort(
                (a, b) =>
                  a.date.localeCompare(b.date) || a.time.localeCompare(b.time),
              )
              .slice(0, 5)
              .map(job => (
                <JobCard key={job.id} job={job} showDate />
              ))}
          </div>
        </div>
      )}

      {/* Needs Invoice Alert */}
      {completedJobs.filter(j => j.status === 'completed').length > 0 && (
        <div className='bg-amber-500/10 border border-amber-500/30 rounded-xl p-4'>
          <h3 className='font-semibold text-amber-600 dark:text-amber-400 mb-2'>
            {completedJobs.filter(j => j.status === 'completed').length} job(s)
            need invoicing
          </h3>
          <p className='text-sm text-muted-foreground'>
            Don&apos;t forget to send invoices for completed work to get paid on
            time.
          </p>
        </div>
      )}

      {showAddJob && <AddJobModal onClose={() => setShowAddJob(false)} />}
    </div>
  );
}
