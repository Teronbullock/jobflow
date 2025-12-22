import { useState } from 'react';
import { Job, useJobs } from '@/context/jobs-context';

export function useSchedule() {
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
      job => job.assignedTo === member && job.date === today
    );
    const inProgress = memberJobs.find(job => job.status === 'in-progress');

    if (inProgress) return { status: 'busy', job: inProgress };

    const nextJob = memberJobs
      .filter(job => job.status === 'scheduled')
      .reduce<Job | null>((prev, curr) => {
        if (!prev) return curr;
        return curr.time < prev.time ? curr : prev;
      }, null);

    if (nextJob) return { status: 'available', job: nextJob };
    return { status: 'free', job: null };
  };

  return {
    showAddJob,
    setShowAddJob,
    selectedCrew,
    setSelectedCrew,
    crewMembers,
    todayJobs,
    upcomingJobs,
    completedJobs,
    getCrewStatus,
  };
}
