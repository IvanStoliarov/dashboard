import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import type { ReactNode } from 'react';
import type { Profile, Ticket as TicketRecord } from '@/lib/types';

interface TicketAssignee {
  profile_id: Profile['id'];
  profile: Pick<Profile, 'id' | 'username'>;
}

export interface TicketData extends TicketRecord {
  ticket_assignees: TicketAssignee[];
}

interface TicketProps {
  ticket: TicketData;
  number: number;
  children?: ReactNode;
}

function formatCreatedAt(value: string) {
  return format(new Date(value), 'MMM d, yyyy');
}

function formatCreatedAtTitle(value: string) {
  return format(new Date(value), "MMMM d, yyyy 'at' h:mm a");
}

export default function Ticket({ ticket, number, children }: TicketProps) {
  const assignees = ticket.ticket_assignees;
  const assigneeNames = assignees.map(
    item => item.profile.username ?? 'Unnamed user',
  );

  return (
    <article className='group grid gap-5 rounded-2xl border border-zinc-200 bg-white p-5 transition-[border-color,box-shadow,transform] duration-200 hover:border-zinc-300 hover:shadow-[0_12px_32px_-20px_rgba(0,0,0,0.35)] sm:p-6 md:grid-cols-[minmax(0,1fr)_16rem] md:items-center md:gap-8'>
      <div className='min-w-0'>
        <div className='mb-3 flex flex-wrap items-center gap-2.5'>
          <span
            title='Ticket status: Open'
            className='inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600'
          >
            <span className='size-1.5 rounded-full bg-emerald-500' />
            Open
          </span>
          <time
            dateTime={ticket.created_at}
            title={`Created on ${formatCreatedAtTitle(ticket.created_at)}`}
            className='inline-flex items-center gap-1.5 text-xs text-zinc-400'
          >
            <CalendarDaysIcon aria-hidden='true' className='size-3.5' />
            {formatCreatedAt(ticket.created_at)}
          </time>
          <span
            title={`Ticket number ${number}`}
            className='text-xs font-medium tabular-nums text-zinc-300'
          >
            #{String(number).padStart(2, '0')}
          </span>
        </div>

        <h2 className='text-base font-semibold leading-6 text-zinc-950 transition-colors group-hover:text-zinc-700 sm:text-lg'>
          {ticket.title}
        </h2>
        <p className='mt-1.5 line-clamp-2 max-w-2xl text-sm leading-6 text-zinc-500'>
          {ticket.description}
        </p>

        {assignees.length > 0 && (
          <div
            className='mt-4 flex items-center'
            aria-label={`Assigned to ${assigneeNames.join(', ')}`}
          >
            {assignees.slice(0, 4).map((item, assigneeIndex) => (
              <span
                key={item.profile_id}
                title={item.profile.username ?? 'Unnamed user'}
                className={`flex size-7 items-center justify-center rounded-full border-2 border-white bg-zinc-900 text-[10px] font-semibold uppercase text-white ${
                  assigneeIndex > 0 ? '-ml-1.5' : ''
                }`}
              >
                {(item.profile.username ?? '?').slice(0, 2)}
              </span>
            ))}
            {assignees.length > 4 && (
              <span className='-ml-1.5 flex size-7 items-center justify-center rounded-full border-2 border-white bg-zinc-100 text-[10px] font-semibold text-zinc-600'>
                +{assignees.length - 4}
              </span>
            )}
            <span className='ml-2.5 truncate text-xs text-zinc-500'>
              {assigneeNames.join(', ')}
            </span>
          </div>
        )}
      </div>

      {children}
    </article>
  );
}
