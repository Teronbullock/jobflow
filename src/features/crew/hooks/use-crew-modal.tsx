'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  crewFormSchema,
  type CrewForm,
} from '@/lib/validations/schemas/crew.schemas';

interface CrewModalProps {
  onClose: () => void;
}

export const useCrewModal = ({ onClose }: CrewModalProps) => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<CrewForm>({
    resolver: zodResolver(crewFormSchema),
  });

  const onSubmit: SubmitHandler<CrewForm> = async formData => {
    try {
      console.log('formData', formData);
      reset();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return { register, handleSubmit, onSubmit, errors };
};
