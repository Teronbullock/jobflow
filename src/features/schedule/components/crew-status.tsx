import { Button } from '@/components/ui/button';
import { Plus, Users } from 'lucide-react';
import { job } from '@/db/schema/job-schema';

interface CrewStatusProps {
  selectedCrew: string;
  setSelectedCrew: (selectedCrew: string) => void;
  setShowAddJob: (showAddJob: boolean) => void;
  crewMembers: string[];
  getCrewStatus: (member: string) => { status: string; job: typeof job };
}

export function CrewStatus({
  selectedCrew,
  setSelectedCrew,
  setShowAddJob,
  crewMembers,
  getCrewStatus,
}: CrewStatusProps) {
  return (
    <>
      <div className='flex items-center justify-end gap-2 mb-4'>
        <Button onClick={() => setShowAddJob(true)} size='sm'>
          <Plus className='w-4 h-4 mr-1' />
          Add crew
        </Button>
      </div>

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
    </>
  );
}
