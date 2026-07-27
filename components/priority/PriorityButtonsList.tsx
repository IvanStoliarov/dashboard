'use client';

import { updateTicketPriority } from '@/lib/actions';
import { useSelect } from '@/lib/hooks/useSelect';
import type { Ticket } from '@/lib/types';
import { useTransition } from 'react';
import PriorityButton from './PriorityButton';
import { usePriority } from '@/lib/hooks/usePriority';
import toast from 'react-hot-toast';

interface PriorityButtonsListProps {
  currentPriority: Ticket['priority'];
  priorities: Ticket['priority'][];
  ticketId?: Ticket['id'];
}

export default function PriorityButtonsList({
  priorities,
  ticketId,
}: PriorityButtonsListProps) {
  const [isPending, startTransition] = useTransition();
  const { close } = useSelect();
  const { setValue, value } = usePriority();

  function updatePriority(priority: Ticket['priority']) {
    if (!ticketId) {
      setValue(priority);
      close();
      return;
    }
    startTransition(async () => {
      const { success } = await updateTicketPriority(ticketId, priority);
      if (!success) {
        toast.error("Couldn't update priority");
        return;
      }
      close();
      setValue(priority);
    });
  }

  return (
    <>
      <div aria-busy={isPending}>
        <ul role='none'>
          {priorities.map(priority => (
            <li role='none' key={priority}>
              <PriorityButton
                currentPriority={value}
                isPending={isPending}
                onClick={updatePriority}
                priority={priority}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
