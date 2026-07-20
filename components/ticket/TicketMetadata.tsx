import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { formatCreatedAt, formatCreatedAtTitle } from '@/lib/format';
import TicketStatusBadge from './TicketStatusBadge';
import Link from 'next/link';
import type { Ticket } from '@/lib/types';

interface TicketMetadataProps {
  createdAt: string;
  id: string;
  status: Ticket['status'];
}

export default function TicketMetadata({
  createdAt,
  id,
  status,
}: TicketMetadataProps) {
  return (
    <div className='mb-3 flex flex-wrap items-center gap-2.5'>
      <TicketStatusBadge status={status} />
      <time
        dateTime={createdAt}
        title={`Created on ${formatCreatedAtTitle(createdAt)}`}
        className='inline-flex items-center gap-1.5 text-xs text-zinc-400'
      >
        <CalendarDaysIcon aria-hidden='true' className='size-3.5' />
        {formatCreatedAt(createdAt)}
      </time>
      <Link
        href={`/ticket/${id}`}
        title={`Ticket id: ${id}`}
        className='text-xs font-medium tabular-nums text-zinc-300'
      >
        #{String(id).padStart(2, '0')}
      </Link>
    </div>
  );
}
