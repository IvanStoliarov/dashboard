import { getTicketStatuses } from '@/lib/actions';
import { Ticket } from '@/lib/types';
import StatusButtonsList from './StatusButtonsList';

interface StatusButtonsProps {
  currentStatus: Ticket['status'];
  ticketId: Ticket['id'];
}

export default async function StatusButtons({
  currentStatus,
  ticketId,
}: StatusButtonsProps) {
  const statuses = await getTicketStatuses();
  return (
    <StatusButtonsList
      currentStatus={currentStatus}
      statuses={statuses}
      ticketId={ticketId}
    />
  );
}
