'use client';

import { useRouter } from 'next/navigation';
import { signUp } from '@/lib/auth/auth-client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type RegAuth,
  regAuthSchema,
} from '@/features/auth/validation/auth.schema';

export default function useSignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegAuth>({
    resolver: zodResolver(regAuthSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<RegAuth> = async FormData => {
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

      router.push('/getting-started');
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
