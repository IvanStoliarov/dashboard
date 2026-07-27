'use client';
import type { Ticket } from '@/lib/types';
import Select from '../select/Select';
import TicketPriority from '../ticket/TicketPriority';
import PriorityButtonsList from './PriorityButtonsList';
import { PriorityProvider, usePriority } from '@/lib/hooks/usePriority';

interface PrioritySelectProps {
  currentPriority?: Ticket['priority'];
  priorities: Ticket['priority'][];
  ticketId?: Ticket['id'];
}

export default function PrioritySelect({
  currentPriority = 'medium',
  priorities,
  ticketId,
}: PrioritySelectProps) {
  return (
    <PriorityProvider initialValue={currentPriority}>
      <PrioritySelectWrapper
        priorities={priorities}
        ticketId={ticketId}
        currentPriority={currentPriority}
      />
    </PriorityProvider>
  );
}

interface PrioritySelectContentProps {
  currentPriority?: Ticket['priority'];
  priorities: Ticket['priority'][];
  ticketId?: Ticket['id'];
}

function PrioritySelectWrapper({
  currentPriority = 'medium',
  priorities,
  ticketId,
}: PrioritySelectContentProps) {
  const { value } = usePriority();

  return (
    <>
      <input type='hidden' name='priority' value={value} />
      <Select
        ariaLabel='Change ticket priority'
        position='right'
        trigger={<TicketPriority priority={value} />}
      >
        <PriorityButtonsList
          currentPriority={currentPriority}
          priorities={priorities}
          ticketId={ticketId}
        />
      </Select>
    </>
  );
}
