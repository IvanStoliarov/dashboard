import { getTickets } from '@/lib/actions';
import { TicketData, TicketDeadlineFilter } from '@/lib/types';

export default async function TicketsCountLabel({
  filterbyuser,
  search,
  status,
  deadline,
}: {
  filterbyuser?: string | undefined;
  search?: string | undefined;
  status?: TicketData['status'];
  deadline?: TicketDeadlineFilter;
}) {
  const tickets = await getTickets({
    filterbyuser,
    searchQuery: search,
    status: status,
    deadline,
  });

  return (
    <span className='rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium tabular-nums text-zinc-600'>
      {tickets.length} {tickets.length === 1 ? 'ticket' : 'tickets'}
    </span>
  );
}
