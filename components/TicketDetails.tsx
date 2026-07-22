import {
  fetchProfileDataById,
  fetchUsersByName,
  getTicketById,
} from '@/lib/actions';
import { formatCreatedAtTitle } from '@/lib/format';
import { notFound } from 'next/navigation';
import TicketContentForm from './TicketContentForm';
import StatusSelect from './StatusSelect';
import StatusButtons from './StatusButtons';
import AssigneesSelect from './assigneesSelect/AssigneesSelect';
import CalendarPicker from './CalendarPicker';

interface TicketDetailsProps {
  id: string;
}

export default async function TicketDetails({ id }: TicketDetailsProps) {
  const ticket = await getTicketById(id);
  if (!ticket) notFound();

  const author = ticket?.created_by
    ? await fetchProfileDataById(ticket?.created_by)
    : null;

  const updateAuthor = !ticket?.ticket_updated_by
    ? null
    : ticket?.ticket_updated_by === ticket?.created_by
      ? author
      : await fetchProfileDataById(ticket?.ticket_updated_by);

  const metadata = [
    { label: 'Created by', value: author?.username },
    {
      label: 'Created',
      value: formatCreatedAtTitle(ticket.created_at),
      dateTime: ticket.created_at,
    },
    {
      label: 'Last updated',
      value: ticket.ticket_updated_at
        ? formatCreatedAtTitle(ticket.ticket_updated_at)
        : 'Not updated yet',
      dateTime: ticket.ticket_updated_at ?? undefined,
    },
    {
      label: 'Updated by',
      value: updateAuthor?.username ?? 'Not updated yet',
    },
    { label: 'Ticket ID', value: ticket.id },
  ];

  return (
    <section
      aria-label='Ticket details'
      className='mx-auto max-w-4xl rounded-2xl border border-zinc-200 bg-white shadow-[0_12px_32px_-20px_rgba(0,0,0,0.25)]'
    >
      <div className='border-b border-zinc-100 px-5 py-5 sm:px-7'>
        <h1 className='sr-only'>Ticket details</h1>
        <div className='flex flex-wrap items-center justify-between gap-3'>
          <div>
            <h2 className='text-sm font-semibold text-zinc-900'>Assignees</h2>
            <AssigneesSelect
              ticketId={ticket.id}
              handleSearch={fetchUsersByName}
              assigneesList={ticket.ticket_assignees}
            />
          </div>
          <StatusSelect currentStatus={ticket.status}>
            <StatusButtons ticketId={ticket.id} currentStatus={ticket.status} />
          </StatusSelect>
        </div>
      </div>

      <div className='grid gap-8 px-5 py-6 sm:px-7 lg:grid-cols-[minmax(0,1fr)_15rem]'>
        <div className='space-y-5'>
          <TicketContentForm ticket={ticket} />
        </div>

        <aside className='border-t border-zinc-100 pt-6 lg:border-t-0 lg:border-l lg:pl-6 lg:pt-0'>
          <h2 className='text-sm font-semibold text-zinc-900'>Details</h2>
          <dl className='mt-4 space-y-4 text-sm'>
            <div>
              <dt className='text-xs font-medium uppercase tracking-wide text-zinc-400'>
                Due date
              </dt>
              <dd className='mt-1'>
                <CalendarPicker
                  ticketId={ticket.id}
                  initialValue={ticket.due_to}
                  variant='details'
                />
              </dd>
            </div>
            {metadata.map(item => (
              <div key={item.label}>
                <dt className='text-xs font-medium uppercase tracking-wide text-zinc-400'>
                  {item.label}
                </dt>
                <dd className='mt-1 break-all text-zinc-600'>
                  {item.dateTime ? (
                    <time dateTime={item.dateTime}>{item.value}</time>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}
