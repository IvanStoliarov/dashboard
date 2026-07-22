import TicketsGrid from './TicketsGrid';
import { Suspense } from 'react';
import TicketsCountLabel from './TicketsCountLabel';
import TicketsCountLabelSkeleton from './TicketsCountLabelSkeleton';
import TicketsGridSkeleton from './TicketsGridSkeleton';
import SortBy from './SortBy';
import AssigneesSelect from './assigneesSelect/AssigneesSelect';
import AssigneeSelectSkeleton from './assigneesSelect/AssigneeSelectSkeleton';
import { fetchUsersByName } from '@/lib/actions';
import AssigneeSelectWrapper from './assigneesSelect/AssigneeSelectWrapper';

export default async function TicketList({
  sortby = 'due-to',
  sortdir = 'asc',
  filterbyuser,
}: {
  sortby: string | undefined;
  sortdir: string | undefined;
  filterbyuser: string | undefined;
}) {
  return (
    <section aria-labelledby='tickets-heading'>
      <div className='flex flex-col gap-4 py-3 md:flex-row md:items-center md:justify-between'>
        <div>
          <Suspense fallback={<AssigneeSelectSkeleton />}>
            <AssigneeSelectWrapper filterbyuser={filterbyuser}>
              {({ assigneeList }) => (
                <AssigneesSelect
                  key={filterbyuser}
                  assigneesList={assigneeList}
                  handleSearch={fetchUsersByName}
                  ticketId=''
                  label='Filter by Assignee'
                  asFilter={true}
                />
              )}
            </AssigneeSelectWrapper>
          </Suspense>
        </div>
        <SortBy />
      </div>
      <div className='mb-5 flex items-end justify-between gap-4'>
        <div>
          <p className='mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400'>
            Workspace
          </p>
          <h2
            id='tickets-heading'
            className='text-2xl font-semibold tracking-tight text-zinc-950'
          >
            Tickets
          </h2>
        </div>
        <Suspense key={filterbyuser} fallback={<TicketsCountLabelSkeleton />}>
          <TicketsCountLabel filterbyuser={filterbyuser} />
        </Suspense>
      </div>

      <Suspense
        key={sortby + sortdir + filterbyuser}
        fallback={<TicketsGridSkeleton />}
      >
        <TicketsGrid
          sortby={sortby}
          sortdir={sortdir}
          filterbyuser={filterbyuser}
        />
      </Suspense>
    </section>
  );
}
