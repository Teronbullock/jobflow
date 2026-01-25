'use client';

import useSignUp from '@/features/auth/hooks/useSignUp';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@components/ui/card';
import { Field, FieldError, FieldLabel } from '@components/ui/field';

export default function SignUpForm() {
  const { register, handleSubmit, errors, onSubmit } = useSignUp();
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <div className='w-full max-w-md'>
        <Card className='w-full'>
          <CardHeader>
            <CardTitle>Register</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
              <Field>
                <FieldLabel htmlFor='name'>Name</FieldLabel>
                <Input
                  id='name'
                  className='mb-4'
                  placeholder='enter your name'
                  {...register('name')}
                />
                {errors.name && <FieldError errors={[errors.name]} />}
              </Field>
              <Field>
                <FieldLabel htmlFor='email'>Email</FieldLabel>
                <Input
                  id='email'
                  className='mb-4'
                  type='email'
                  placeholder='enter email'
                  {...register('email')}
                />
                {errors.email && <FieldError errors={[errors.email]} />}
              </Field>
              <Field>
                <FieldLabel htmlFor='password'>Password</FieldLabel>
                <Input
                  id='password'
                  className='mb-4'
                  type='password'
                  placeholder='enter password'
                  {...register('password')}
                />
                {errors.password && <FieldError errors={[errors.password]} />}
              </Field>
              <Field>
                <FieldLabel htmlFor='password-confirm'>
                  Confirm Password
                </FieldLabel>
                <Input
                  id='password-confirm'
                  className='mb-4'
                  type='password'
                  placeholder='confirm password'
                  {...register('passwordConfirm')}
                />
                {errors.passwordConfirm && (
                  <FieldError errors={[errors.passwordConfirm]} />
                )}
              </Field>
              <Field>
                <Button type='submit' className='w-full'>
                  Register
                </Button>
                {errors.root && <FieldError errors={[errors.root]} />}
              </Field>
            </form>
          </CardContent>
          <CardFooter className='flex-col gap-4'>
            <div>
              <span className='mr-1'>Have an account?</span>
              <Button variant='link' className='text-blue-600'>
                Login
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
