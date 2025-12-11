'use client';

import { useState } from 'react';
import { useJobs } from '@/context/jobs-context';
import { JobCard, AddJobModal } from '@/features/jobs/components';
import { Button } from '@/components/ui/button';
import { Plus, Users } from 'lucide-react';

export function ScheduleView() {
  const { jobs, crewMembers } = useJobs();
  const [showAddJob, setShowAddJob] = useState(false);
  const [selectedCrew, setSelectedCrew] = useState<string | 'all'>('all');

  const today = new Date().toISOString().split('T')[0];

  const filteredJobs = jobs.filter(job => {
    if (selectedCrew !== 'all' && job.assignedTo !== selectedCrew) return false;
    return true;
  });

  const todayJobs = filteredJobs.filter(job => job.date === today);
  const upcomingJobs = filteredJobs.filter(job => job.date > today);
  const completedJobs = filteredJobs.filter(
    job => job.status === 'completed' || job.status === 'invoiced'
  );

  const getCrewStatus = (member: string) => {
    const memberJobs = jobs.filter(
      j => j.assignedTo === member && j.date === today
    );
    const inProgress = memberJobs.find(j => j.status === 'in-progress');
    if (inProgress) return { status: 'busy', job: inProgress };
    const nextJob = memberJobs
      .filter(j => j.status === 'scheduled')
      .sort((a, b) => a.time.localeCompare(b.time))[0];
    if (nextJob) return { status: 'available', job: nextJob };
    return { status: 'free', job: null };
  };

  return (
    <div className='space-y-6'>
      {/* Crew Status Bar */}
      <div className='bg-card border border-border rounded-xl p-4'>
        <div className='flex items-center gap-2 mb-4'>
          <Users className='w-5 h-5 text-muted-foreground' />
          <h2 className='font-semibold text-foreground'>Crew Status</h2>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
          {crewMembers.map(member => {
            const { status, job } = getCrewStatus(member);
            return (
              <button
                key={member}
                onClick={() =>
                  setSelectedCrew(selectedCrew === member ? 'all' : member)
                }
                className={`p-3 rounded-lg border transition-all text-left ${
                  selectedCrew === member
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-muted-foreground/30'
                }`}
              >
                <div className='flex items-center gap-2 mb-1'>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      status === 'busy'
                        ? 'bg-amber-500'
                        : status === 'available'
                        ? 'bg-emerald-500'
                        : 'bg-muted-foreground'
                    }`}
                  />
                  <span className='font-medium text-foreground'>{member}</span>
                </div>
                <p className='text-xs text-muted-foreground truncate'>
                  {status === 'busy' && job
                    ? `At: ${job.address}`
                    : status === 'available' && job
                    ? `Next: ${job.time}`
                    : 'No jobs today'}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Today's Schedule */}
      <div>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-lg font-semibold text-foreground'>
            Today's Jobs
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
                  a.date.localeCompare(b.date) || a.time.localeCompare(b.time)
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
            Don't forget to send invoices for completed work to get paid on
            time.
          </p>
        </div>
      )}

      {showAddJob && <AddJobModal onClose={() => setShowAddJob(false)} />}
    </div>
  );
}
