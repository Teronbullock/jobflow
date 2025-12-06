import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  LoginForm,
  LoginFormSchema,
} from '@/features/auth/validation/auth.schema';
import { loginAction } from '@/features/auth/actions/auth.actions';

export default function useSignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginForm> = data => {
    loginAction(data);
  };
  return { register, handleSubmit, onSubmit, errors };
}
