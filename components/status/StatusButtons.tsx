import { Ticket } from '@/lib/types';
import StatusButtonsList from './StatusButtonsList';

interface StatusButtonsProps {
  currentStatus: Ticket['status'];
  ticketId: Ticket['id'];
  statuses: Ticket['status'][];
}

export default function StatusButtons({
  currentStatus,
  ticketId,
  statuses,
}: StatusButtonsProps) {
  return (
    <StatusButtonsList
      currentStatus={currentStatus}
      statuses={statuses}
      ticketId={ticketId}
    />
  );
}
