'use client';
import { useAppSelector } from '@/lib/hooks/store';
import { TICKET_STATUS_CONFIG } from '@/lib/ticket-status';
import { Ticket } from '@/lib/types';
import TicketCard from '../TicketCard';
import { useDragOperation, useDroppable } from '@dnd-kit/react';

interface ColumnProps {
  status: Ticket['status'];
}

export default function Column({ status }: ColumnProps) {
  const tickets = useAppSelector(state => state.tasks.tickets);
  const { target, source } = useDragOperation();
  const currentSourceStatus = source?.data.status === status;
  const isCurrentTarget = !currentSourceStatus && target?.id === status;
  const { ref } = useDroppable({ id: status });
  return (
    <section
      key={status}
      aria-labelledby={`${status}-tickets-heading`}
      className={`rounded-2xl border p-3 transition-[background-color,border-color,box-shadow] duration-200 ease-out ${
        isCurrentTarget
          ? 'border-amber-300 bg-amber-50/40 shadow-[0_10px_28px_-24px_rgba(245,158,11,0.55)]'
          : 'border-zinc-200 bg-zinc-50/70'
      }`}
    >
      <div className='mb-3 flex items-center justify-between gap-3 px-1'>
        <h2
          id={`${status}-tickets-heading`}
          className='text-sm font-semibold text-zinc-900'
        >
          {TICKET_STATUS_CONFIG[status].label}
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
      <ul
        ref={ref}
        className='grid gap-3 h-full auto-rows-max'
        aria-label={`${TICKET_STATUS_CONFIG[status].label} tickets`}
      >
        {tickets
          .filter(ticket => ticket.status === status)
          .map((ticket, index) => (
            <TicketCard key={ticket.id} ticket={ticket} index={index} />
          ))}
      </ul>
    </section>
  );
}
