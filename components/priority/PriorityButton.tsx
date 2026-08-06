'use client';

import { TICKET_PRIORITY_CONFIG } from '@/lib/ticket-priority';
import type { Ticket } from '@/lib/types';

interface PriorityButtonProps {
  currentPriority: Ticket['priority'];
  isPending: boolean;
  onClick: (priority: Ticket['priority']) => void;
  priority: Ticket['priority'];
}

export default function PriorityButton({
  currentPriority,
  isPending,
  onClick,
  priority,
}: PriorityButtonProps) {
  const { label, dotClassName } = TICKET_PRIORITY_CONFIG[priority];

  return (
    <button
      disabled={isPending || priority === currentPriority}
      type='button'
      role='menuitem'
      onClick={() => onClick(priority)}
      className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium text-zinc-700 transition-colors hover:cursor-pointer hover:bg-zinc-100 hover:text-zinc-950 disabled:hover:cursor-auto focus-visible:bg-zinc-100 focus-visible:text-zinc-950 focus-visible:outline-none disabled:opacity-60 ${currentPriority === priority ? 'bg-zinc-100 text-zinc-950' : ''}`}
    >
      <span aria-hidden='true' className={`size-2 rounded-full ${dotClassName}`} />
      {label}
    </button>
  );
}
