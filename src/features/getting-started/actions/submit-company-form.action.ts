'use server';

import { createCompany, updateUserCompanyId } from '../actions/gettingStarted.actions';
import { redirect } from 'next/navigation';

export interface CreateCompanyResult {
  success: boolean;
  error?: string;
}

export const createCompanyForUser = async (formData: FormData): Promise<CreateCompanyResult> => {
  const companyName = formData.get('companyName') as string;

  if (!companyName || !companyName.trim()) {
    return {
      success: false,
      error: 'Company name is required',
    };
  }

  try {
    const res = await createCompany(companyName);

    if (!res) {
      return {
        success: false,
        error: 'Company not created',
      };
    }

    const user = await updateUserCompanyId(res[0].id);

    if (!user) {
      return {
        success: false,
        error: 'Failed to associate company with user',
      };
    }

    // Redirect after successful creation
    redirect('/dashboard?tab=schedule');
    
    // This return is just to satisfy TypeScript since redirect throws an error internally
    return {
      success: true,
    };
  } catch (error) {
    console.error('Failed to create company:', error);
    return {
      success: false,
      error: 'Failed to create company. Please try again.',
    };
  }
};