'use client';

import { updateTicketStatus } from '@/lib/actions';
import { Ticket } from '@/lib/types';
import { useTransition } from 'react';
import StatusButton from './StatusButton';

interface StatusButtonsListProps {
  currentStatus: Ticket['status'];
  statuses: Ticket['status'][];
  ticketId: Ticket['id'];
}

export default function StatusButtonsList({
  currentStatus,
  statuses,
  ticketId,
}: StatusButtonsListProps) {
  const [isPending, startTransition] = useTransition();

  function updateStatus(status: Ticket['status']) {
    startTransition(async () => {
      await updateTicketStatus(ticketId, status);
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
