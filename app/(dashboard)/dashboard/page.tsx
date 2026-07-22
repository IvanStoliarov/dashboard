import { PlusIcon } from '@heroicons/react/24/outline';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import LinkAsButton from '@/components/LinkAsButton';
import TicketList from '@/components/TicketList';
import SortBy from '@/components/SortBy';

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  const { sortby = 'due-to', sortdir = 'asc' } = await searchParams;

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
        <div className='flex flex-col gap-2 lg:flex-row'>
          <SortBy />
          <LinkAsButton
            href='/new-ticket'
            className='gap-2 self-start -order-1 lg:order-1'
          >
            <PlusIcon aria-hidden='true' className='size-4' />
            New ticket
          </LinkAsButton>
        </div>
      </section>
      <TicketList
        sortby={Array.isArray(sortby) ? sortby.at(0) : sortby}
        sortdir={Array.isArray(sortdir) ? sortdir.at(0) : sortdir}
      />
    </div>
  );
}
