'use client';
import { TICKET_STATUS_CONFIG } from '@/lib/ticket-status';
import { Ticket } from '@/lib/types';

interface ButtonProps {
  status: Ticket['status'];
  currentStatus: Ticket['status'];
  isPending: boolean;
  onClick: (status: Ticket['status']) => void;
}

export default function StatusButton({
  status,
  currentStatus,
  isPending,
  onClick,
}: ButtonProps) {
  const { label, dotClassName } = TICKET_STATUS_CONFIG[status];

  return (
    <button
      disabled={isPending}
      type='button'
      role='menuitem'
      onClick={() => onClick(status)}
      className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-950 focus-visible:bg-zinc-100 focus-visible:text-zinc-950 focus-visible:outline-none disabled:cursor-wait disabled:opacity-60 ${currentStatus === status ? 'bg-zinc-100 text-zinc-950' : ''}`}
    >
      <span className={`size-2 rounded-full ${dotClassName}`} />
      {label}
    </button>
  );
}
