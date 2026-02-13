'use client';

import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCompany } from '../actions/gettingStarted.actions';
import {
  CompanyReg,
  companyRegSchema,
} from '@/features/getting-started/validation/company-reg';

export const useGettingStarted = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<CompanyReg>({
    resolver: zodResolver(companyRegSchema),
  });

  const onSubmit: SubmitHandler<CompanyReg> = async formData => {
    try {
      const res = await createCompany(formData.companyName);

      if (!res) {
        throw new Error('company not created');
      }

      router.refresh();
      router.push('/dashboard?tab=schedule');
    } catch (error) {
      console.error('Error creating company:', error);
      setError('root', {
        type: 'manual',
        message: 'Error creating company. Please try again.',
      });
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    reset,
  };
};
