import { getTickets, getTicketStatuses } from '@/lib/actions';
import { TicketIcon } from '@heroicons/react/24/outline';
import StoreProvider from '@/app/StoreProvider';
import Board from './board/Board';
import { TicketData } from '@/lib/types';
import { Activity } from 'react';

export default async function TicketsGrid({
  sortby,
  sortdir,
  filterbyuser,
  search,
  status,
}: {
  sortby: string;
  sortdir: string;
  filterbyuser: string | undefined;
  search: string | undefined;
  status?: TicketData['status'];
}) {
  const [statuses, tickets] = await Promise.all([
    getTicketStatuses(),
    getTickets({ sortby, sortdir, filterbyuser, searchQuery: search, status }),
  ]);

  return (
    <>
      {tickets.length === 0 && (
        <div className='rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/70 px-6 py-14 text-center'>
          <span className='mx-auto mb-4 flex size-11 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-500 shadow-sm'>
            <TicketIcon aria-hidden='true' className='size-5' />
          </span>
          <h2 className='text-sm font-semibold text-zinc-900'>
            {status ? 'No tickets match this status' : 'No tickets yet'}
          </h2>
          <p className='mx-auto mt-1 max-w-sm text-sm leading-6 text-zinc-600'>
            {status
              ? 'Clear the status filter to view tickets in other columns.'
              : 'Create your first ticket to start tracking work with your team.'}
          </p>
        </div>
      )}
      <Activity mode={tickets.length > 0 ? 'visible' : 'hidden'}>
        <StoreProvider
          tickets={tickets}
          statuses={statuses}
          activeStatus={status}
        >
          <Board statuses={statuses} activeStatus={status} />
        </StoreProvider>
      </Activity>
    </>
  );
}
