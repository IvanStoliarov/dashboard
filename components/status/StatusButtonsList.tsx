'use client';

import { updateTicketStatus } from '@/lib/actions';
import { type Ticket, type TicketData } from '@/lib/types';
import { useTransition } from 'react';
import StatusButton from './StatusButton';
import { useSelect } from '@/lib/hooks/useSelect';

interface StatusButtonsListProps {
  currentStatus: Ticket['status'];
  statuses: Ticket['status'][];
  ticketId: Ticket['id'];
  onUpdate?: ((update: { ticketId: TicketData['id']; status: TicketData['status'] }) => void) | null;
}

export default function StatusButtonsList({
  currentStatus,
  statuses,
  ticketId,
  onUpdate,
}: StatusButtonsListProps) {
  const [isPending, startTransition] = useTransition();
  const { close } = useSelect();

  function updateStatus(status: Ticket['status']) {
    startTransition(async () => {
      const { success } = await updateTicketStatus(ticketId, status);
      if (!success) return;

      close();
      onUpdate?.({ ticketId, status });
    });
  }

  return (
    <div aria-busy={isPending}>
      <ul role='none'>
        {statuses.map(status => (
          <li role='none' key={status}>
            <StatusButton
              currentStatus={currentStatus}
              isPending={isPending}
              onClick={updateStatus}
              status={status}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
