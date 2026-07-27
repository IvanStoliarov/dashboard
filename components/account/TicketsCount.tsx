import type { TicketData, TicketDeadlineFilter } from '@/lib/types';
import { User } from '@supabase/supabase-js';
import { isBefore, isToday, parseISO, startOfDay } from 'date-fns';
import Link from 'next/link';

function filterByDeadline(date: string | null, filter: TicketDeadlineFilter) {
  if (!date) return false;
  return filter === 'today'
    ? isToday(parseISO(date))
    : filter === 'outdated'
      ? isBefore(parseISO(date), startOfDay(new Date()))
      : false;
}

export default async function TicketsCount({
  status = undefined,
  deadline,
  assignedTickets,
  userId,
}: {
  status?: TicketData['status'];
  deadline?: TicketDeadlineFilter;
  assignedTickets: TicketData[];
  userId: User['id'];
}) {
  const ticketCount = status
    ? assignedTickets.filter(ticket => ticket.status === status).length
    : deadline
      ? assignedTickets.filter(
          ticket =>
            ticket.status !== 'done' &&
            filterByDeadline(ticket.due_to, deadline),
        ).length
      : assignedTickets.length;
  const ticketLabel = ticketCount === 1 ? 'ticket' : 'tickets';

  const params = new URLSearchParams();
  params.set('filterbyuser', userId);
  if (status) {
    params.set('status', status);
  }
  if (deadline) {
    params.set('deadline', deadline);
  }

  const ariaLabel =
    deadline === 'outdated'
      ? `View ${ticketCount} outdated ${ticketLabel} assigned to you`
      : deadline === 'today'
        ? `View ${ticketCount} ${ticketLabel} due today and assigned to you`
        : `View ${ticketCount} ${ticketLabel} assigned to you`;
  const linkColor =
    deadline === 'outdated'
      ? 'text-red-950 hover:text-red-700'
      : deadline === 'today'
        ? 'text-amber-950 hover:text-amber-700'
        : 'text-zinc-950 hover:text-blue-700';
  const labelColor =
    deadline === 'outdated'
      ? 'text-red-700 group-hover/count:text-red-600'
      : deadline === 'today'
        ? 'text-amber-700 group-hover/count:text-amber-600'
        : 'text-zinc-500 group-hover/count:text-blue-600';
  const description =
    deadline === 'outdated'
      ? 'past deadline'
      : deadline === 'today'
        ? 'deadline today'
        : 'assigned to you';
  const countContent = (
    <>
      <span className='text-3xl font-semibold tracking-tight tabular-nums'>
        {ticketCount}
      </span>
      <span className={`text-sm font-medium transition-colors ${labelColor}`}>
        {ticketLabel}
      </span>
    </>
  );

  return (
    <div>
      {ticketCount > 0 ? (
        <Link
          href={`/dashboard?${params}`}
          aria-label={ariaLabel}
          className={`group/count inline-flex items-baseline gap-2 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${linkColor}`}
        >
          {countContent}
        </Link>
      ) : (
        <span
          className={`inline-flex items-baseline gap-2 ${
            deadline === 'outdated'
              ? 'text-red-950'
              : deadline === 'today'
                ? 'text-amber-950'
                : 'text-zinc-950'
          }`}
        >
          {countContent}
        </span>
      )}
      <p
        className={`mt-1 text-sm ${
          deadline === 'outdated'
            ? 'text-red-700'
            : deadline === 'today'
              ? 'text-amber-700'
              : 'text-zinc-500'
        }`}
      >
        {description}
      </p>
    </div>
  );
}
