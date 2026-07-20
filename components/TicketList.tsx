import { TicketIcon } from '@heroicons/react/24/outline';
import Ticket from '@/components/Ticket';
import { getTickets } from '@/lib/actions';

export default async function TicketList() {
  const tickets = await getTickets();

  return (
    <section aria-labelledby='tickets-heading'>
      <div className='mb-5 flex items-end justify-between gap-4'>
        <div>
          <p className='mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400'>
            Workspace
          </p>
          <h1
            id='tickets-heading'
            className='text-2xl font-semibold tracking-tight text-zinc-950'
          >
            Tickets
          </h1>
        </div>
        <span className='rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium tabular-nums text-zinc-600'>
          {tickets.length} {tickets.length === 1 ? 'ticket' : 'tickets'}
        </span>
      </div>

      {tickets.length === 0 ? (
        <div className='rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/70 px-6 py-14 text-center'>
          <span className='mx-auto mb-4 flex size-11 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-500 shadow-sm'>
            <TicketIcon aria-hidden='true' className='size-5' />
          </span>
          <h2 className='text-sm font-semibold text-zinc-900'>
            No tickets yet
          </h2>
          <p className='mx-auto mt-1 max-w-sm text-sm leading-6 text-zinc-500'>
            Create your first ticket to start tracking work with your team.
          </p>
        </div>
      ) : (
        <ul className='grid gap-3'>
          {tickets.map((ticket, index) => (
            <li key={ticket.id}>
              <Ticket ticket={ticket} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
