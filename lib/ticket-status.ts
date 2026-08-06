import type { Ticket } from './types';

interface TicketStatusConfig {
  label: string;
  badgeClassName: string;
  dotClassName: string;
}

export const TICKET_STATUS_CONFIG = {
  todo: {
    label: 'To do',
    badgeClassName: 'bg-zinc-100 text-zinc-700',
    dotClassName: 'bg-zinc-500',
  },
  in_progress: {
    label: 'In progress',
    badgeClassName: 'bg-blue-50 text-blue-700',
    dotClassName: 'bg-blue-500',
  },
  qa: {
    label: 'QA',
    badgeClassName: 'bg-amber-50 text-amber-700',
    dotClassName: 'bg-amber-500',
  },
  done: {
    label: 'Done',
    badgeClassName: 'bg-emerald-50 text-emerald-700',
    dotClassName: 'bg-emerald-500',
  },
} satisfies Record<Ticket['status'], TicketStatusConfig>;

export function isTicketStatus(value: unknown): value is Ticket['status'] {
  return (
    typeof value === 'string' && Object.hasOwn(TICKET_STATUS_CONFIG, value)
  );
}
