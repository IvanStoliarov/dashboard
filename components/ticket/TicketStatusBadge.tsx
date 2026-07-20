import type { Ticket } from '@/lib/types';
import { TICKET_STATUS_CONFIG } from '@/lib/ticket-status';

interface TicketStatusBadgeProps {
  status: Ticket['status'];
}

export default function TicketStatusBadge({ status }: TicketStatusBadgeProps) {
  const { label, badgeClassName, dotClassName } =
    TICKET_STATUS_CONFIG[status];

  return (
    <span
      title={`Ticket status: ${label}`}
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${badgeClassName}`}
    >
      <span className={`size-1.5 rounded-full ${dotClassName}`} />
      {label}
    </span>
  );
}
