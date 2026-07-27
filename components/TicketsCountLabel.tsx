import { getTickets } from '@/lib/actions';
import { getSearchParamsValue } from '@/lib/getSearchParamsValue';
import { isTicketStatus } from '@/lib/ticket-status';
import { SearchParams } from '@/lib/types';

export default async function TicketsCountLabel({
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

  const tickets = await getTickets({
    filterbyuser: getSearchParamsValue(searchParams?.filterbyuser),
    searchQuery: getSearchParamsValue(searchParams?.search),
    status: statusValue,
    deadline: deadlineValue,
  });

  return (
    <span className='rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium tabular-nums text-zinc-600'>
      {tickets.length} {tickets.length === 1 ? 'ticket' : 'tickets'}
    </span>
  );
}
