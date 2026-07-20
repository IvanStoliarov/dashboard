import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { formatCreatedAt, formatCreatedAtTitle } from '@/lib/format';
import TicketStatusBadge from './TicketStatusBadge';

interface TicketMetadataProps {
  createdAt: string;
  number: number;
}

export default function TicketMetadata({
  createdAt,
  number,
}: TicketMetadataProps) {
  return (
    <div className='mb-3 flex flex-wrap items-center gap-2.5'>
      <TicketStatusBadge />
      <time
        dateTime={createdAt}
        title={`Created on ${formatCreatedAtTitle(createdAt)}`}
        className='inline-flex items-center gap-1.5 text-xs text-zinc-400'
      >
        <CalendarDaysIcon aria-hidden='true' className='size-3.5' />
        {formatCreatedAt(createdAt)}
      </time>
      <span
        title={`Ticket number ${number}`}
        className='text-xs font-medium tabular-nums text-zinc-300'
      >
        #{String(number).padStart(2, '0')}
      </span>
    </div>
  );
}
