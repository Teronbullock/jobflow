import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegForm, RegFormSchema } from '@/features/auth/validation/auth.schema';
import { signUpAction } from '@/features/auth/actions/auth.actions';

export default function useSignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegForm>({
    resolver: zodResolver(RegFormSchema),
  });

  const onSubmit: SubmitHandler<RegForm> = data => {
    signUpAction(data);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
}
