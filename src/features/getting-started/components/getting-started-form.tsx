'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGettingStarted } from '../hooks/useGettingStarted';

export const GettingStartedForm = () => {
  const { companyName, handleOnChange, handleSubmit, error } =
    useGettingStarted();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <div className='w-full max-w-md'>
        <Card className='w-full'>
          <CardHeader>
            <CardTitle>Welcome to Jobflow!</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormSubmit} className='flex flex-col'>
              <div className='grid gap-3 py-1'>
                <p className='text-muted-foreground'>
                  Thank you for signing up!
                </p>
                <p className='text-muted-foreground'>
                  Let's get started by setting up your company.
                </p>
                <div className='grid grid-cols-1 items-center gap-4'>
                  <Label htmlFor='company-name' className='text-md'>
                    Company Name
                  </Label>
                  <Input
                    id='company-name'
                    value={companyName}
                    onChange={handleOnChange}
                    className='col-span-3'
                  />
                </div>
                {error && <p className='text-red-500'>{error}</p>}
                <Button type='submit'>Save</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
