import React, { Suspense } from 'react';
import NewTicketForm from '@/components/newTicket/NewTicketForm';
import NewTicketFormSkeleton from '@/components/newTicket/NewTicketFormSkeleton';

export default async function NewTicket() {
  return (
    <div className='mx-auto max-w-2xl'>
      <header className='border-b border-zinc-100 pb-6'>
        <p className='text-sm font-medium text-zinc-500'>Ticket workspace</p>
        <h1 className='mt-1 text-2xl font-semibold tracking-tight text-zinc-950'>
          Create a new ticket
        </h1>
        <p className='mt-2 max-w-xl text-sm leading-6 text-zinc-500'>
          Capture the details your team needs to understand and resolve the
          issue.
        </p>
      </header>
      <Suspense fallback={<NewTicketFormSkeleton />}>
        <NewTicketForm />
      </Suspense>
    </div>
  );
}
