import { getTickets, getTicketStatuses } from '@/lib/actions';
import { TICKET_STATUS_CONFIG } from '@/lib/ticket-status';
import type { CSSProperties } from 'react';
import TicketCard from '@/components/TicketCard';
import { TicketIcon } from '@heroicons/react/24/outline';

export default async function TicketsGrid() {
  const [statuses, tickets] = await Promise.all([
    getTicketStatuses(),
    getTickets(),
  ]);

  return (
    <>
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
        <div
          className='grid grid-cols-1 gap-4 lg:grid-cols-[repeat(var(--status-count),minmax(0,1fr))]'
          style={{ '--status-count': statuses.length } as CSSProperties}
        >
          {statuses.map(status => (
            <section
              key={status}
              aria-labelledby={`${status}-tickets-heading`}
              className='rounded-2xl border border-zinc-200 bg-zinc-50/70 p-3'
            >
              <div className='mb-3 flex items-center justify-between gap-3 px-1'>
                <h2
                  id={`${status}-tickets-heading`}
                  className='text-sm font-semibold text-zinc-900'
                >
                  {TICKET_STATUS_CONFIG[status].label}
                </h2>
                <span className='rounded-full bg-white px-2 py-0.5 text-xs font-medium tabular-nums text-zinc-500 shadow-sm ring-1 ring-zinc-200'>
                  {tickets.filter(ticket => ticket.status === status).length}
                </span>
              </div>
              <ul
                className='grid gap-3'
                aria-label={`${TICKET_STATUS_CONFIG[status].label} tickets`}
              >
                {tickets
                  .filter(ticket => ticket.status === status)
                  .map(ticket => (
                    <li key={ticket.id}>
                      <TicketCard ticket={ticket} />
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </>
  );
}
