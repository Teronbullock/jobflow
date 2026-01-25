import { useForm, SubmitHandler } from 'react-hook-form';
import { useJobs } from '@/context/jobs-context';
import { zodResolver } from '@hookform/resolvers/zod';
import { JobSchema, jobSchema } from '@/lib/validations/schemas/job.schemas';
import { postAddJob } from '@/features/jobs/action/handle-job';

export const useJobModal = (onClose: () => void) => {
  const { addJob, crewMembers } = useJobs();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    reset,
  } = useForm<JobSchema>({
    resolver: zodResolver(jobSchema),
  });

  const onSubmit: SubmitHandler<JobSchema> = async data => {
    try {
      const newJob = await postAddJob(data);

      console.log('NewJob', newJob);
      addJob(newJob);
    } catch (error) {}
    onClose();
    reset(); // Reset form after submission
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    watch,
    errors,
    crewMembers,
  };
};
