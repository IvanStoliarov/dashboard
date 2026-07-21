import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { formatCreatedAt, formatCreatedAtTitle } from '@/lib/format';
import Link from 'next/link';
import type { Ticket } from '@/lib/types';
import StatusSelect from '../StatusSelect';
import StatusButtons from '../StatusButtons';
import CalendarPicker from '../CalendarPicker';

interface TicketMetadataProps {
  createdAt: string;
  dueTo: Ticket['due_to'];
  id: string;
  status: Ticket['status'];
}

export default function TicketMetadata({
  createdAt,
  dueTo,
  id,
  status,
}: TicketMetadataProps) {
  return (
    <div className='mb-3 flex flex-wrap items-center gap-2.5'>
      <StatusSelect position='left' currentStatus={status}>
        <StatusButtons ticketId={id} currentStatus={status} />
      </StatusSelect>
      <CalendarPicker ticketId={id} initialValue={dueTo} />
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
        className='text-xs font-medium tabular-nums text-zinc-300 hover:underline'
      >
        #{String(id).padStart(2, '0')}
      </Link>
    </div>
  );
}
