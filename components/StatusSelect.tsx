'use client';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
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
  position?: 'right' | 'left';
}

export default function StatusSelect({
  currentStatus,
  children,
  position = 'left',
}: StatusSelectProps) {
  return (
    <StatusSelectProvider>
      <StatusSelectContent position={position} currentStatus={currentStatus}>
        {children}
      </StatusSelectContent>
    </StatusSelectProvider>
  );
}

function StatusSelectContent({
  currentStatus,
  children,
  position,
}: StatusSelectProps) {
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
        className={`group inline-flex items-center gap-1.5 rounded-lg border bg-white px-1.5 py-1 outline-none transition hover:cursor-pointer hover:border-zinc-400 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${isOpen ? 'border-zinc-400 shadow-sm ring-2 ring-zinc-200' : 'border-zinc-200'}`}
      >
        <TicketStatusBadge status={currentStatus} />
        <ChevronDownIcon
          aria-hidden='true'
          className={`size-4 text-zinc-400 transition-transform group-hover:text-zinc-600 ${isOpen ? 'rotate-180 text-zinc-600' : ''}`}
        />
      </button>
      {isOpen && (
        <div
          role='menu'
          aria-label='Change ticket status'
          className={`absolute top-[calc(100%+0.5rem)] z-10 min-w-40 rounded-xl border border-zinc-200 bg-white p-1.5 shadow-[0_16px_32px_-16px_rgba(24,24,27,0.35)] [&_ul]:space-y-0.5 ${position === 'left' ? 'left-0' : 'right-0'}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
