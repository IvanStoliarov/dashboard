import { getTickets, getTicketStatuses } from '@/lib/actions';
import { TicketIcon } from '@heroicons/react/24/outline';
import StoreProvider from '@/app/StoreProvider';
import Board from './board/Board';
import { SearchParams } from '@/lib/types';
import { Activity } from 'react';
import { getSearchParamsValue } from '@/lib/getSearchParamsValue';
import { isTicketStatus } from '@/lib/ticket-status';

export default async function TicketsGrid({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const statusString = getSearchParamsValue(searchParams?.status);
  const statusValue = isTicketStatus(statusString) ? statusString : undefined;

  const deadlineString = getSearchParamsValue(searchParams?.deadline);
  const deadlineValue =
    deadlineString === 'outdated' || deadlineString === 'today'
      ? deadlineString
      : undefined;

  const [statuses, tickets] = await Promise.all([
    getTicketStatuses(),
    getTickets({
      sortby: getSearchParamsValue(searchParams?.sortby),
      sortdir: getSearchParamsValue(searchParams?.sortdir),
      filterbyuser: getSearchParamsValue(searchParams?.filterbyuser),
      searchQuery: getSearchParamsValue(searchParams?.search),
      status: statusValue,
      deadline: deadlineValue,
    }),
  ]);

  return (
    <>
      {tickets.length === 0 && (
        <div className='rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/70 px-6 py-14 text-center'>
          <span className='mx-auto mb-4 flex size-11 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-500 shadow-sm'>
            <TicketIcon aria-hidden='true' className='size-5' />
          </span>
          <h2 className='text-sm font-semibold text-zinc-900'>
            {deadlineValue
              ? `No ${deadlineValue === 'outdated' ? 'outdated' : 'due today'} tickets`
              : statusValue
                ? 'No tickets match this status'
                : 'No tickets yet'}
          </h2>
          <p className='mx-auto mt-1 max-w-sm text-sm leading-6 text-zinc-600'>
            {deadlineValue
              ? 'Clear the deadline filter to view tickets with other due dates.'
              : statusValue
                ? 'Clear the status filter to view tickets in other columns.'
                : 'Create your first ticket to start tracking work with your team.'}
          </p>
        </div>
      )}
      <Activity mode={tickets.length > 0 ? 'visible' : 'hidden'}>
        <StoreProvider
          tickets={tickets}
          statuses={statuses}
          activeStatus={statusValue}
        >
          <Board statuses={statuses} activeStatus={statusValue} />
        </StoreProvider>
      </Activity>
    </>
  );
}
