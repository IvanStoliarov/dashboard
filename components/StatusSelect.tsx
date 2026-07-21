'use client';
import { Ticket } from '@/lib/types';
import TicketStatusBadge from './ticket/TicketStatusBadge';
import { useEffect, useRef } from 'react';
import {
  StatusSelectProvider,
  useStatusSelect,
} from '@/lib/hooks/useStatusSelect';

interface StatusSelectProps {
  currentStatus: Ticket['status'];
  children: React.ReactNode;
}

export default function StatusSelect({
  currentStatus,
  children,
}: StatusSelectProps) {
  return (
    <StatusSelectProvider>
      <StatusSelectContent currentStatus={currentStatus}>
        {children}
      </StatusSelectContent>
    </StatusSelectProvider>
  );
}

function StatusSelectContent({ currentStatus, children }: StatusSelectProps) {
  const { isOpen, close, toggleIsOpen } = useStatusSelect();
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!selectRef.current?.contains(event.target as Node)) {
        close();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [close]);

  return (
    <div ref={selectRef} className='relative inline-flex'>
      <button
        type='button'
        aria-expanded={isOpen}
        aria-haspopup='menu'
        aria-label='Change ticket status'
        onClick={toggleIsOpen}
        className='group inline-flex items-center rounded-full outline-none transition focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
      >
        <TicketStatusBadge status={currentStatus} />
      </button>
      {isOpen && (
        <div
          role='menu'
          aria-label='Change ticket status'
          className='absolute right-0 top-[calc(100%+0.5rem)] z-10 min-w-40 rounded-xl border border-zinc-200 bg-white p-1.5 shadow-[0_16px_32px_-16px_rgba(24,24,27,0.35)] [&_ul]:space-y-0.5'
        >
          {children}
        </div>
      )}
    </div>
  );
}
