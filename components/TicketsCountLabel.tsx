import { getTickets } from '@/lib/actions';
import { isTicketStatus } from '@/lib/ticket-status';
import { TicketData } from '@/lib/types';

export default async function TicketsCountLabel({
  filterbyuser,
  search,
  status,
}: {
  filterbyuser?: string | undefined;
  search?: string | undefined;
  status?: TicketData['status'];
}) {
  const tickets = await getTickets({
    filterbyuser,
    searchQuery: search,
    status: status,
  });

  return (
    <span className='rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium tabular-nums text-zinc-600'>
      {tickets.length} {tickets.length === 1 ? 'ticket' : 'tickets'}
    </span>
  );
}
