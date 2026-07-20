import { PlusIcon } from '@heroicons/react/24/outline';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import LinkAsButton from '@/components/LinkAsButton';
import TicketList from './TicketList';
import { Suspense } from 'react';
import Spinner from '@/components/Spinner';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (!claims) {
    redirect('/login');
  }

  return (
    <div>
      <section className='mb-8 flex flex-col justify-between gap-4 border-b border-zinc-100 pb-7 sm:flex-row sm:items-center'>
        <div>
          <h2 className='text-lg font-semibold tracking-tight text-zinc-950'>
            Team workspace
          </h2>
          <p className='mt-1 text-sm text-zinc-500'>
            Keep work moving and ownership clear.
          </p>
        </div>
        <LinkAsButton href='/new-ticket' className='gap-2 self-start'>
          <PlusIcon aria-hidden='true' className='size-4' />
          New ticket
        </LinkAsButton>
      </section>
      <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense>
    </div>
  );
}
