'use client';

import useLogin from '@/features/auth/hooks/useLogin';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldError, FieldLabel } from '@components/ui/field';

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleRegister: () => void;
}

export function LoginModal({
  open,
  onOpenChange,
  handleRegister,
}: LoginModalProps) {
  const { register, handleSubmit, errors, onSubmit, GithubOnSubmit } = useLogin(
    {
      onOpenChange,
    },
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Welcome back</DialogTitle>
          <DialogDescription>Log in to your CrewFlow account</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
          <Field>
            <FieldLabel htmlFor='email'>Email</FieldLabel>
            <Input
              id='email'
              className='mb-2'
              type='email'
              placeholder='enter email'
              {...register('email')}
            />
          </Field>
          <Field className='min-h-5 mb-2'>
            {errors.email && <FieldError errors={[errors.email]} />}
          </Field>
          <Field>
            <FieldLabel htmlFor='password'>Password</FieldLabel>
            <Input
              id='password'
              className='mb-2'
              type='password'
              placeholder='enter password'
              {...register('password')}
            />
          </Field>
          <Field className='min-h-14 mb-2'>
            {errors.password && (
              <FieldError className='pb-0!' errors={[errors.password]} />
            )}
            {errors.root && <FieldError errors={[errors.root]} />}
          </Field>
          <Field>
            <Button type='submit' className='w-full'>
              Login
            </Button>
          </Field>
          <Button type='button' variant='ghost' className='text-sm'>
            Forgot password?
          </Button>
        </form>
        <DialogFooter className='flex-col! gap-5'>
          <Button variant='outline' className='w-full'>
            Login with Google
          </Button>
          <Button variant='outline' className='w-full' onClick={GithubOnSubmit}>
            Login with GitHub
          </Button>
          <div>
            <span className='mr-1'>No account?</span>
            <Button
              type='button'
              variant='ghost'
              className='text-blue-600 hover:bg-unset!'
              onClick={handleRegister}
            >
              Register
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

{
  /* <div className='flex flex-col gap-2'>
  <Button type='submit' disabled={isLoading}>
    {isLoading ? 'Logging in...' : 'Log in'}
  </Button>
</div>; */
}
