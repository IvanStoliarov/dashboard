import { getTicketStatuses, updateTicketStatus } from '@/lib/actions';
import { Ticket } from '@/lib/types';
import StatusButton from './StatusButton';

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
    <ul>
      {statuses
        .filter(status => status !== currentStatus)
        .map(status => (
          <li key={status}>
            <StatusButton
              status={status}
              ticketId={ticketId}
              onClickHandler={updateTicketStatus}
            />
          </li>
        ))}
    </ul>
  );
}
