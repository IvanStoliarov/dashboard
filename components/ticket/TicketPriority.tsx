import type { TicketData } from '@/lib/types';
import { TICKET_PRIORITY_CONFIG } from '@/lib/ticket-priority';

interface TicketPriorityProps {
  priority: TicketData['priority'];
}

export default function TicketPriority({ priority }: TicketPriorityProps) {
  const { label, badgeClassName, dotClassName } =
    TICKET_PRIORITY_CONFIG[priority];

  return (
    <span
      title={`Ticket priority: ${label}`}
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${badgeClassName}`}
    >
      <span className={`size-1.5 rounded-full ${dotClassName}`} />
      {label}
    </span>
  );
}
