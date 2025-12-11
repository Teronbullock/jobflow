'use client';

import { useJobs } from '@/context/jobs-context';
import { Button } from '@/components/ui/button';
import {
  Send,
  CheckCircle,
  Clock,
  DollarSign,
  AlertCircle,
} from 'lucide-react';

export function InvoiceView() {
  const { invoices, jobs, markInvoiceSent, markInvoicePaid } = useJobs();

  const completedJobs = jobs.filter(j => j.status === 'completed');
  const pendingInvoices = invoices.filter(i => i.status === 'pending');
  const sentInvoices = invoices.filter(i => i.status === 'sent');
  const paidInvoices = invoices.filter(i => i.status === 'paid');

  const totalOutstanding = [...pendingInvoices, ...sentInvoices].reduce(
    (sum, inv) => sum + inv.amount,
    0
  );
  const totalPaid = paidInvoices.reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className='space-y-6'>
      {/* Stats */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <div className='bg-card border border-border rounded-xl p-4'>
          <div className='flex items-center gap-2 text-muted-foreground mb-1'>
            <AlertCircle className='w-4 h-4' />
            <span className='text-sm'>Needs Invoice</span>
          </div>
          <p className='text-2xl font-bold text-foreground'>
            {completedJobs.length}
          </p>
        </div>
        <div className='bg-card border border-border rounded-xl p-4'>
          <div className='flex items-center gap-2 text-muted-foreground mb-1'>
            <Clock className='w-4 h-4' />
            <span className='text-sm'>Pending</span>
          </div>
          <p className='text-2xl font-bold text-foreground'>
            {pendingInvoices.length + sentInvoices.length}
          </p>
        </div>
        <div className='bg-card border border-border rounded-xl p-4'>
          <div className='flex items-center gap-2 text-muted-foreground mb-1'>
            <DollarSign className='w-4 h-4' />
            <span className='text-sm'>Outstanding</span>
          </div>
          <p className='text-2xl font-bold text-amber-600 dark:text-amber-400'>
            ${totalOutstanding}
          </p>
        </div>
        <div className='bg-card border border-border rounded-xl p-4'>
          <div className='flex items-center gap-2 text-muted-foreground mb-1'>
            <CheckCircle className='w-4 h-4' />
            <span className='text-sm'>Paid (30 days)</span>
          </div>
          <p className='text-2xl font-bold text-emerald-600 dark:text-emerald-400'>
            ${totalPaid}
          </p>
        </div>
      </div>

      {/* Needs Invoicing */}
      {completedJobs.length > 0 && (
        <div>
          <h2 className='text-lg font-semibold text-foreground mb-4 flex items-center gap-2'>
            <AlertCircle className='w-5 h-5 text-amber-500' />
            Ready to Invoice
          </h2>
          <div className='grid gap-3'>
            {completedJobs.map(job => (
              <InvoiceJobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      )}

      {/* Pending Invoices */}
      {pendingInvoices.length > 0 && (
        <div>
          <h2 className='text-lg font-semibold text-foreground mb-4'>
            Ready to Send
          </h2>
          <div className='grid gap-3'>
            {pendingInvoices.map(invoice => (
              <InvoiceCard
                key={invoice.id}
                invoice={invoice}
                onSend={() => markInvoiceSent(invoice.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Sent Invoices */}
      {sentInvoices.length > 0 && (
        <div>
          <h2 className='text-lg font-semibold text-foreground mb-4'>
            Awaiting Payment
          </h2>
          <div className='grid gap-3'>
            {sentInvoices.map(invoice => (
              <InvoiceCard
                key={invoice.id}
                invoice={invoice}
                onMarkPaid={() => markInvoicePaid(invoice.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Paid Invoices */}
      {paidInvoices.length > 0 && (
        <div>
          <h2 className='text-lg font-semibold text-foreground mb-4'>
            Recently Paid
          </h2>
          <div className='grid gap-3'>
            {paidInvoices.slice(0, 5).map(invoice => (
              <InvoiceCard key={invoice.id} invoice={invoice} />
            ))}
          </div>
        </div>
      )}

      {invoices.length === 0 && completedJobs.length === 0 && (
        <div className='bg-card border border-border rounded-xl p-8 text-center'>
          <p className='text-muted-foreground'>
            No invoices yet. Complete jobs to generate invoices.
          </p>
        </div>
      )}
    </div>
  );
}

function InvoiceJobCard({ job }: { job: any }) {
  const { createInvoice } = useJobs();

  return (
    <div className='bg-card border border-amber-500/30 rounded-xl p-4 flex items-center justify-between'>
      <div>
        <h3 className='font-semibold text-foreground'>{job.client}</h3>
        <p className='text-sm text-muted-foreground'>{job.description}</p>
      </div>
      <div className='flex items-center gap-4'>
        <span className='font-semibold text-foreground'>${job.amount}</span>
        <Button size='sm' onClick={() => createInvoice(job.id)}>
          Create Invoice
        </Button>
      </div>
    </div>
  );
}

function InvoiceCard({
  invoice,
  onSend,
  onMarkPaid,
}: {
  invoice: any;
  onSend?: () => void;
  onMarkPaid?: () => void;
}) {
  const statusConfig = {
    pending: { label: 'Draft', color: 'bg-muted text-muted-foreground' },
    sent: {
      label: 'Sent',
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    },
    paid: {
      label: 'Paid',
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
  };

  return (
    <div className='bg-card border border-border rounded-xl p-4 flex items-center justify-between'>
      <div>
        <div className='flex items-center gap-2 mb-1'>
          <h3 className='font-semibold text-foreground'>{invoice.client}</h3>
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              statusConfig[invoice.status as keyof typeof statusConfig].color
            }`}
          >
            {statusConfig[invoice.status as keyof typeof statusConfig].label}
          </span>
        </div>
        <p className='text-sm text-muted-foreground'>
          Due: {invoice.dueDate} • Created: {invoice.createdAt}
        </p>
      </div>
      <div className='flex items-center gap-4'>
        <span className='font-semibold text-foreground'>${invoice.amount}</span>
        {onSend && (
          <Button size='sm' variant='outline' onClick={onSend}>
            <Send className='w-3 h-3 mr-1' />
            Send
          </Button>
        )}
        {onMarkPaid && (
          <Button size='sm' onClick={onMarkPaid}>
            <CheckCircle className='w-3 h-3 mr-1' />
            Mark Paid
          </Button>
        )}
      </div>
    </div>
  );
}
