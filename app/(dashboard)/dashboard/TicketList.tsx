import { TicketIcon } from '@heroicons/react/24/outline';
import Ticket from '@/components/Ticket';
import { getTickets, updateTicketAssignee } from '@/lib/actions';
import { getAllUsers } from '@/lib/data/profiles';
import AssigneeMultiSelect from './AssigneeMultiSelect';

export default async function TicketList() {
  const [tickets, users] = await Promise.all([getTickets(), getAllUsers()]);

  return (
    <section aria-labelledby='tickets-heading'>
      <div className='mb-5 flex items-end justify-between gap-4'>
        <div>
          <p className='mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400'>
            Workspace
          </p>
          <h1
            id='tickets-heading'
            className='text-2xl font-semibold tracking-tight text-zinc-950'
          >
            Tickets
          </h1>
        </div>
        <span className='rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium tabular-nums text-zinc-600'>
          {tickets.length} {tickets.length === 1 ? 'ticket' : 'tickets'}
        </span>
      </div>

      {tickets.length === 0 ? (
        <div className='rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/70 px-6 py-14 text-center'>
          <span className='mx-auto mb-4 flex size-11 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-500 shadow-sm'>
            <TicketIcon aria-hidden='true' className='size-5' />
          </span>
          <h2 className='text-sm font-semibold text-zinc-900'>
            No tickets yet
          </h2>
          <p className='mx-auto mt-1 max-w-sm text-sm leading-6 text-zinc-500'>
            Create your first ticket to start tracking work with your team.
          </p>
        </div>
      ) : (
        <ul className='grid gap-3'>
          {tickets.map((ticket, index) => (
            <li key={ticket.id}>
              <Ticket ticket={ticket} number={index + 1}>
                <form
                  action={updateTicketAssignee}
                  className='rounded-xl border border-zinc-200 bg-zinc-50/80 p-3'
                >
                  <input type='hidden' name='ticket_id' value={ticket.id} />
                  <label
                    className='mb-1.5 block text-xs font-medium text-zinc-500'
                    htmlFor={`assigned_to_${ticket.id}`}
                  >
                    Assignees
                  </label>
                  <AssigneeMultiSelect
                    id={`assigned_to_${ticket.id}`}
                    name='assigned_to'
                    users={users}
                    defaultValue={ticket.ticket_assignees.map(
                      item => item.profile_id,
                    )}
                  />
                  <p className='mt-1.5 text-[11px] leading-4 text-zinc-400'>
                    Changes save automatically
                  </p>
                </form>
              </Ticket>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
