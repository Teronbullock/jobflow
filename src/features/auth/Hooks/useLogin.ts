'use client';

import { useRouter } from 'next/navigation';
import { signIn } from '@/lib/auth/auth-client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  BaseAuthSchema,
  type BaseAuth,
} from '@/features/auth/validation/auth.schema';

interface useLoginProps {
  onOpenChange: (open: boolean) => void;
}

export default function useLogin({ onOpenChange }: useLoginProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<BaseAuth>({
    resolver: zodResolver(BaseAuthSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<BaseAuth> = async formData => {
    try {
      const { error } = await signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setError('root', {
          type: 'server',
          message: error.message,
        });
        return;
      }

      onOpenChange(false);
      reset();

      router.push('/dashboard?tab=schedule');
      router.refresh();
    } catch (err) {
      console.error('Critical Network/Client Error during signIn:', err);
      setError('root', {
        type: 'catch',
        message:
          'There was a connection issue. Please check your internet or try again.',
      });
    }
  };

  const GithubOnSubmit = async () => {
    try {
      const { error } = await signIn.social({
        provider: 'github',
        callbackURL: '/dashboard?tab=schedule',
      });

      if (error) {
        setError('root', {
          type: 'server',
          message: error.message,
        });
        return;
      }

      onOpenChange(false);
    } catch (err) {
      console.error('Critical Network/Client Error during signIn:', err);
      setError('root', {
        type: 'catch',
        message:
          'There was a connection issue. Please check your internet or try again.',
      });
    }
  };

  return { register, handleSubmit, onSubmit, errors: errors, GithubOnSubmit };
}
