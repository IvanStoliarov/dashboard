import { type Ticket, type TicketData } from '@/lib/types';
import StatusButtonsList from './StatusButtonsList';

interface StatusButtonsProps {
  currentStatus: Ticket['status'];
  ticketId: Ticket['id'];
  statuses: Ticket['status'][];
  onUpdate?: ((update: { ticketId: TicketData['id']; status: TicketData['status'] }) => void) | null;
}

export default function StatusButtons({
  currentStatus,
  ticketId,
  statuses,
  onUpdate,
}: StatusButtonsProps) {
  return (
    <StatusButtonsList
      currentStatus={currentStatus}
      statuses={statuses}
      ticketId={ticketId}
      onUpdate={onUpdate}
    />
  );
}
