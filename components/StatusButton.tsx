'use client';
import { useStatusSelect } from '@/lib/hooks/useStatusSelect';
import { TICKET_STATUS_CONFIG } from '@/lib/ticket-status';
import { Ticket } from '@/lib/types';

interface ButtonProps {
  ticketId: Ticket['id'];
  status: Ticket['status'];
  onClickHandler: (tickedId: Ticket['id'], status: Ticket['status']) => void;
}

export default function StatusButton({
  status,
  ticketId,
  onClickHandler,
}: ButtonProps) {
  const { close, isOpen } = useStatusSelect();
  console.log(isOpen);
  const { label, dotClassName } = TICKET_STATUS_CONFIG[status];
  async function clickHandler() {
    await onClickHandler(ticketId, status);
    close();
  }

  return (
    <button
      type='button'
      role='menuitem'
      onClick={clickHandler}
      className='flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-950 focus-visible:bg-zinc-100 focus-visible:text-zinc-950 focus-visible:outline-none'
    >
      <span className={`size-2 rounded-full ${dotClassName}`} />
      {label}
    </button>
  );
}
