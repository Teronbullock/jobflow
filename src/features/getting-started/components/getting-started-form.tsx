'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGettingStarted } from '@/features/getting-started/hooks/useGettingStarted';

export const GettingStartedForm = () => {
  const { handleSubmit, onSubmit, register, errors } = useGettingStarted();

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <div className='w-full max-w-md'>
        <Card className='w-full'>
          <CardHeader>
            <CardTitle>Welcome to Jobflow!</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
              <div className='grid gap-3 py-1'>
                <p className='text-muted-foreground'>
                  Thank you for signing up!
                </p>
                <p className='text-muted-foreground'>
                  Let&apos;s get started by setting up your company.
                </p>
                <div className='grid grid-cols-1 items-center gap-4'>
                  <Label htmlFor='company-name' className='text-md'>
                    Company Name
                  </Label>
                  <Input
                    id='company-name'
                    {...register('companyName', { required: true })}
                  />
                </div>
                <div className='min-h-15'>
                  {errors && (
                    <>
                      <p className='text-red-500 mb-2'>
                        {errors.companyName?.message}
                      </p>
                      <p className='text-red-500'>{errors.root?.message}</p>
                    </>
                  )}
                </div>
                <Button type='submit'>Save</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
