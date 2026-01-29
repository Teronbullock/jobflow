'use client';
import { useState } from 'react';
import {
  createCompany,
  updateUserCompanyId,
} from '../actions/gettingStarted.actions';
import { useRouter } from 'next/navigation';

export const useGettingStarted = () => {
  const [companyName, setCompanyName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(e.target.value);
    setError('');
  };

  const handleSubmit = async () => {
    if (!companyName.trim()) {
      setError('Company name is required');
      return;
    }

    try {
      const res = await createCompany(companyName);

      if (!res) {
        throw new Error('company not created');
      }

      const user = await updateUserCompanyId(res[0].id);

      if (!user) {
        throw new Error('company not created for user');
      }

      router.push('/dashboard?tab=schedule');
    } catch (error) {
      console.error('Failed to create company:', error);
      setError('Error ');
    }
  };

  return {
    companyName,
    error,
    handleOnChange,
    handleSubmit,
  };
};
