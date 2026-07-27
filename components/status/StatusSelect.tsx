import { cloneElement, type ReactElement } from 'react';
import { type Ticket, type TicketData } from '@/lib/types';
import TicketStatusBadge from '../ticket/TicketStatusBadge';
import Select from '../select/Select';
import type StatusButtons from './StatusButtons';

interface StatusSelectProps {
  currentStatus: Ticket['status'];
  children: ReactElement<React.ComponentProps<typeof StatusButtons>>;
  position?: 'right' | 'left';
  onUpdate?:
    | (({
        ticketId,
        status,
      }: {
        ticketId: TicketData['id'];
        status: TicketData['status'];
      }) => void)
    | null;
}

export default function StatusSelect({
  currentStatus,
  children,
  position = 'left',
  onUpdate = null,
}: StatusSelectProps) {
  return (
    <Select
      ariaLabel='Change ticket status'
      position={position}
      trigger={<TicketStatusBadge status={currentStatus} />}
    >
      {cloneElement(children, { onUpdate })}
    </Select>
  );
}
