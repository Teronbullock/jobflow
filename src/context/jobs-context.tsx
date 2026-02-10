'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

export type JobStatus = 'scheduled' | 'in-progress' | 'completed' | 'invoiced';

export interface Job {
  id: string;
  client: string;
  address: string;
  description: string;
  assignedTo: string;
  date: string;
  time: string;
  status: JobStatus;
  amount: number;
}

export interface Invoice {
  id: string;
  jobId: string;
  client: string;
  amount: number;
  status: 'pending' | 'sent' | 'paid';
  createdAt: string;
  dueDate: string;
}

interface JobsContextType {
  jobs: Job[];
  invoices: Invoice[];
  addJob: (job: Omit<Job, 'id'>) => void;
  updateJobStatus: (id: string, status: JobStatus) => void;
  createInvoice: (jobId: string) => void;
  markInvoiceSent: (id: string) => void;
  markInvoicePaid: (id: string) => void;
  crewMembers: string[];
}

const JobsContext = createContext<JobsContextType | undefined>(undefined);

const initialJobs: Job[] = [
  {
    id: '1',
    client: 'Johnson Family',
    address: '123 Oak Street',
    description: 'Weekly lawn maintenance',
    assignedTo: 'Mike',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    status: 'scheduled',
    amount: 150,
  },
  {
    id: '2',
    client: 'Smith Residence',
    address: '456 Maple Ave',
    description: 'Gutter cleaning',
    assignedTo: 'Sarah',
    date: new Date().toISOString().split('T')[0],
    time: '11:00',
    status: 'in-progress',
    amount: 200,
  },
  {
    id: '3',
    client: 'Downtown Office',
    address: '789 Main St',
    description: 'Window cleaning - 3 floors',
    assignedTo: 'Mike',
    date: new Date().toISOString().split('T')[0],
    time: '14:00',
    status: 'scheduled',
    amount: 450,
  },
  {
    id: '4',
    client: 'Garcia Home',
    address: '321 Pine Road',
    description: 'Pressure washing driveway',
    assignedTo: 'Tom',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '10:00',
    status: 'scheduled',
    amount: 175,
  },
];

export function JobsProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const addJob = (job: Omit<Job, 'id'>) => {
    const newJob: Job = {
      ...job,
      id: Date.now().toString(),
    };
    setJobs(prev => [...prev, newJob]);
  };

  const updateJobStatus = (id: string, status: JobStatus) => {
    setJobs(prev =>
      prev.map(job => (job.id === id ? { ...job, status } : job)),
    );
  };

  const createInvoice = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;

    const invoice: Invoice = {
      id: Date.now().toString(),
      jobId,
      client: job.client,
      amount: job.amount,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
    };
    setInvoices(prev => [...prev, invoice]);
    updateJobStatus(jobId, 'invoiced');
  };

  const markInvoiceSent = (id: string) => {
    setInvoices(prev =>
      prev.map(inv => (inv.id === id ? { ...inv, status: 'sent' } : inv)),
    );
  };

  const markInvoicePaid = (id: string) => {
    setInvoices(prev =>
      prev.map(inv => (inv.id === id ? { ...inv, status: 'paid' } : inv)),
    );
  };

  return (
    <JobsContext.Provider
      value={{
        jobs,
        invoices,
        addJob,
        updateJobStatus,
        createInvoice,
        markInvoiceSent,
        markInvoicePaid,
      }}
    >
      {children}
    </JobsContext.Provider>
  );
}

export function useJobs() {
  const context = useContext(JobsContext);
  if (!context) throw new Error('useJobs must be used within JobsProvider');
  return context;
}
