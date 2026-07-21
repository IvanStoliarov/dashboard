import TicketContent from './ticket/TicketContent';
import TicketAssigneeList from './ticket/TicketAssigneeList';
import TicketMetadata from './ticket/TicketMetadata';
import type { TicketData } from '@/lib/types';

interface TicketCardProps {
  ticket: TicketData;
}

export default function TicketCard({ ticket }: TicketCardProps) {
  return (
    <article className='group rounded-2xl border border-zinc-200 bg-white p-5 transition-[border-color,box-shadow,transform] duration-200 hover:border-zinc-300 hover:shadow-[0_12px_32px_-20px_rgba(0,0,0,0.35)]'>
      <div className='min-w-0'>
        <TicketMetadata
          createdAt={ticket.created_at}
          dueTo={ticket.due_to}
          id={ticket.id}
          status={ticket.status}
        />
        <TicketContent
          id={ticket.id}
          title={ticket.title}
          description={ticket.description}
        />
        <TicketAssigneeList assignees={ticket.ticket_assignees} />
      </div>
    </article>
  );
}
