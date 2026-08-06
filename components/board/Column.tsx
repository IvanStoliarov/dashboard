'use client';
import { useAppSelector } from '@/lib/hooks/store';
import { TICKET_STATUS_CONFIG } from '@/lib/ticket-status';
import { Ticket } from '@/lib/types';
import TicketCard from '../TicketCard';
import { useDragOperation, useDroppable } from '@dnd-kit/react';
import { CSSProperties, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface ColumnProps {
  status: Ticket['status'];
}

export default function Column({ status }: ColumnProps) {
  const tickets = useAppSelector(state => state.tasks.tickets);
  const { target, source } = useDragOperation();
  const currentSourceStatus = source?.data.status === status;
  const isCurrentTarget = !currentSourceStatus && target?.id === status;
  const [isOpen, setIsOpen] = useState(true);
  const { ref } = useDroppable({ id: status });

  const filteredTickets = tickets.filter(ticket => ticket.status === status);
  return (
    <section
      ref={ref}
      key={status}
      aria-labelledby={`${status}-tickets-heading`}
      className={`rounded-2xl border p-3 transition-[background-color,border-color,box-shadow] duration-200 ease-out ${
        isCurrentTarget
          ? 'border-amber-300 bg-amber-50/40 shadow-[0_10px_28px_-24px_rgba(245,158,11,0.55)]'
          : 'border-zinc-200 bg-zinc-50/70'
      }`}
    >
      <div className='flex items-center justify-between gap-3 px-1'>
        <h2 id={`${status}-tickets-heading`}>
          <button
            type='button'
            aria-controls={`${status}-tickets`}
            aria-expanded={isOpen}
            onClick={() => setIsOpen(currentIsOpen => !currentIsOpen)}
            className='group flex items-center gap-1 text-sm font-semibold text-zinc-900 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
          >
            <span>{TICKET_STATUS_CONFIG[status].label}</span>
            <ChevronDownIcon
              aria-hidden='true'
              className={`size-4 text-zinc-400 transition-transform group-hover:text-zinc-600 md:hidden ${
                isOpen ? 'rotate-180 text-zinc-600' : ''
              }`}
            />
          </button>
        </h2>
        <span
          aria-label={`${tickets.filter(ticket => ticket.status === status).length} tickets`}
          className={`rounded-full px-2 py-0.5 text-xs font-medium tabular-nums shadow-sm ring-1 transition-colors duration-200 ${
            isCurrentTarget
              ? 'bg-amber-50 text-amber-700 ring-amber-200'
              : 'bg-white text-zinc-600 ring-zinc-200'
          }`}
        >
          {tickets.filter(ticket => ticket.status === status).length}
        </span>
      </div>
      <div
        style={
          {
            '--duration': `${Math.min(400, 180 + filteredTickets.length * 30)}ms`,
          } as CSSProperties
        }
        className={`grid transition-[grid-template-rows,opacity,margin] duration-(--duration) ease-in-out motion-reduce:transition-none md:mt-3 md:grid-rows-[1fr] md:opacity-100 ${
          isOpen
            ? 'mt-3 grid-rows-[1fr] opacity-100'
            : 'mt-0 grid-rows-[0fr] opacity-0'
        }`}
      >
        <ul
          id={`${status}-tickets`}
          className='grid min-h-0 gap-3 overflow-hidden'
          aria-label={`${TICKET_STATUS_CONFIG[status].label} tickets`}
        >
          {filteredTickets.map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </ul>
      </div>
    </section>
  );
}
