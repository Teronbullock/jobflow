'use client';

import { useRouter } from 'next/navigation';
import { signUp, authClient } from '@/lib/auth/auth-client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegForm, RegFormSchema } from '@/features/auth/validation/auth.schema';

export default function useSignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegForm>({
    resolver: zodResolver(RegFormSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<RegForm> = async FormData => {
    try {
      const { error } = await signUp.email({
        name: FormData.name,
        email: FormData.email,
        password: FormData.password,
      });

      if (error) {
        console.error('Authentication Failed:', error.message);

        setError('root', {
          type: 'server',
          message: error.message,
        });
        return;
      }

      router.push('/dashboard/schedule');
    } catch (error) {
      console.error('Network Error:', error);
      setError('root', { type: 'server', message: 'Authentication Failed' });
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
}
