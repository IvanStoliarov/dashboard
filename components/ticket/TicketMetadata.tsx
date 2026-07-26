'use client';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { formatCreatedAt, formatCreatedAtTitle } from '@/lib/format';
import type { Ticket, TicketData } from '@/lib/types';
import StatusSelect from '../status/StatusSelect';
import StatusButtons from '../status/StatusButtons';
import CalendarPicker from '../calendar/CalendarPicker';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/store';
import {
  updateTicketDueToState,
  updateTicketStatus,
} from '@/lib/features/tasksSlice';
import { flushSync } from 'react-dom';

interface TicketMetadataProps {
  createdAt: string;
  dueTo: Ticket['due_to'];
  id: string;
  status: Ticket['status'];
}

export default function TicketMetadata({
  createdAt,
  dueTo,
  id,
  status,
}: TicketMetadataProps) {
  const statuses = useAppSelector(state => state.tasks.statuses);
  const dispatch = useAppDispatch();

  function onUpdateStatus({
    ticketId,
    status,
  }: {
    ticketId: TicketData['id'];
    status: TicketData['status'];
  }) {
    const commitStatusUpdate = () => {
      flushSync(() => {
        dispatch(updateTicketStatus({ ticketId, status }));
      });
    };
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (!document.startViewTransition || prefersReducedMotion) {
      commitStatusUpdate();
      return;
    }

    document.startViewTransition(commitStatusUpdate);
  }

  function onUpdateDueToDate({
    ticketId,
    newDate,
  }: {
    ticketId: TicketData['id'];
    newDate: TicketData['due_to'];
  }) {
    dispatch(updateTicketDueToState({ ticketId, newDate }));
  }

  return (
    <div className='mb-3 flex flex-wrap items-center gap-2.5'>
      <div className='flex flex-col items-start gap-1.5'>
        <StatusSelect
          position='left'
          currentStatus={status}
          onUpdate={onUpdateStatus}
        >
          <StatusButtons
            ticketId={id}
            currentStatus={status}
            statuses={statuses}
          />
        </StatusSelect>
        <CalendarPicker
          key={dueTo}
          onUpdate={onUpdateDueToDate}
          ticketId={id}
          initialValue={dueTo}
        />
      </div>
      <time
        dateTime={createdAt}
        title={`Created on ${formatCreatedAtTitle(createdAt)}`}
        className='inline-flex items-center gap-1.5 text-xs text-zinc-600'
      >
        <CalendarDaysIcon aria-hidden='true' className='size-3.5' />
        <span>Created {formatCreatedAt(createdAt)}</span>
      </time>
    </div>
  );
}
