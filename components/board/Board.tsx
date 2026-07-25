'use client';

import { CSSProperties } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/store';
import { DragDropProvider, DragEndEvent } from '@dnd-kit/react';
import Column from './Column';
import { updateTicketStatus as updateTicketStatusAction } from '@/lib/actions';
import {
  startPending,
  stopPending,
  updateTicketStatus,
} from '@/lib/features/tasksSlice';
import { TICKET_STATUS_CONFIG } from '@/lib/ticket-status';
import type { Ticket } from '@/lib/types';

interface BoardProps {
  statuses: Ticket['status'][];
}

function isTicketStatus(value: unknown): value is Ticket['status'] {
  return typeof value === 'string' && value in TICKET_STATUS_CONFIG;
}

export default function Board({ statuses }: BoardProps) {
  const { isPending } = useAppSelector(state => state.tasks);
  const dispatch = useAppDispatch();

  async function handleDragEnd(e: DragEndEvent) {
    if (e.canceled) return;
    const { operation } = e;
    const ticketId = operation.source?.id;
    const newStatus = operation.target?.id;
    const previousStatus = operation.source?.data.status;
    if (
      typeof ticketId !== 'string' ||
      !isTicketStatus(newStatus) ||
      !isTicketStatus(previousStatus) ||
      previousStatus === newStatus
    )
      return;

    dispatch(startPending());
    dispatch(updateTicketStatus({ ticketId, status: newStatus }));
    try {
      const { success } = await updateTicketStatusAction(ticketId, newStatus);
      if (!success) {
        dispatch(updateTicketStatus({ ticketId, status: previousStatus }));
      }
    } catch {
      dispatch(updateTicketStatus({ ticketId, status: previousStatus }));
    } finally {
      dispatch(stopPending());
    }
  }

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <div className='relative' aria-busy={isPending}>
        {isPending && (
          <div
            className='absolute inset-0 z-10 flex cursor-wait items-start justify-center rounded-2xl bg-white/20 pt-5 backdrop-blur-[1px]'
            role='status'
            aria-live='polite'
          >
            <span className='inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-lg shadow-zinc-900/10'>
              <span
                className='size-3.5 animate-spin rounded-full border-2 border-zinc-200 border-t-blue-600'
                aria-hidden='true'
              />
              Saving changes
            </span>
          </div>
        )}
        <div
          className={`grid grid-cols-1 gap-4 transition-[opacity,filter] duration-200 ease-out lg:grid-cols-[repeat(var(--status-count),minmax(0,1fr))] ${
            isPending
              ? 'pointer-events-none select-none opacity-60 saturate-50'
              : 'opacity-100'
          }`}
          style={{ '--status-count': statuses.length } as CSSProperties}
        >
          {statuses.map(status => (
            <Column key={status} status={status} />
          ))}
        </div>
      </div>
    </DragDropProvider>
  );
}
