import TicketsGrid from './TicketsGrid';
import { Suspense } from 'react';
import TicketsCountLabel from './TicketsCountLabel';
import TicketsCountLabelSkeleton from './TicketsCountLabelSkeleton';
import TicketsGridSkeleton from './TicketsGridSkeleton';
import SortBy from './SortBy';
import AssigneesSelect from './AssigneesSelect';
import { fetchUsersByIds, fetchUsersByName } from '@/lib/actions';

export default async function TicketList({
  sortby = 'due-to',
  sortdir = 'asc',
  filterbyuser,
}: {
  sortby: string | undefined;
  sortdir: string | undefined;
  filterbyuser: string | undefined;
}) {
  const assigneeIds = filterbyuser?.split(',');
  const assigneesData = assigneeIds ? await fetchUsersByIds(assigneeIds) : [];
  const assigneeList = assigneesData.map(user => ({
    profile_id: user.id,
    profile: { id: user.id, username: user.username },
  }));
  return (
    <section aria-labelledby='tickets-heading'>
      <div className='flex flex-col gap-4 py-3 md:flex-row md:items-center md:justify-between'>
        <div>
          <AssigneesSelect
            key={filterbyuser}
            assigneesList={assigneeList}
            handleSearch={fetchUsersByName}
            ticketId=''
            label='Filter by Assignee'
            asFilter={true}
          />
        </div>
        <SortBy />
      </div>
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
        <Suspense fallback={<TicketsCountLabelSkeleton />}>
          <TicketsCountLabel filterbyuser={filterbyuser} />
        </Suspense>
      </div>

      <Suspense key={sortby + sortdir} fallback={<TicketsGridSkeleton />}>
        <TicketsGrid
          sortby={sortby}
          sortdir={sortdir}
          filterbyuser={filterbyuser}
        />
      </Suspense>
    </section>
  );
}
