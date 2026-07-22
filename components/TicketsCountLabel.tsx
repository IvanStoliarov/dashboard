import { getTickets } from '@/lib/actions';

export default async function TicketsCountLabel({
  filterbyuser,
}: {
  filterbyuser?: string | undefined;
}) {
  const tickets = await getTickets({ filterbyuser });

  return (
    <span className='rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium tabular-nums text-zinc-600'>
      {tickets.length} {tickets.length === 1 ? 'ticket' : 'tickets'}
    </span>
  );
}
