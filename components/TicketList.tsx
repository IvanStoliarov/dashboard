import TicketsGrid from './TicketsGrid';
import { Suspense } from 'react';
import TicketsCountLabel from './TicketsCountLabel';
import TicketsCountLabelSkeleton from './TicketsCountLabelSkeleton';
import TicketsGridSkeleton from './TicketsGridSkeleton';
import SortBy from './sort/SortBy';
import AssigneesSelect from './assigneesSelect/AssigneesSelect';
import AssigneeSelectSkeleton from './assigneesSelect/AssigneeSelectSkeleton';
import { fetchUsersByName } from '@/lib/actions';
import AssigneeSelectWrapper from './assigneesSelect/AssigneeSelectWrapper';
import TicketSearch from './search/TicketSearch';
import { TicketData } from '@/lib/types';
import ActiveFilters from './board/ActiveFilters';
import Spinner from './Spinner';

export default async function TicketList({
  sortby = 'due-to',
  sortdir = 'asc',
  filterbyuser,
  search,
  status,
}: {
  sortby: string | undefined;
  sortdir: string | undefined;
  filterbyuser: string | undefined;
  search: string | undefined;
  status?: TicketData['status'];
}) {
  return (
    <section aria-labelledby='tickets-heading'>
      <div className='mb-5 grid grid-cols-[1fr_auto] md:flex md:items-center md:justify-between gap-4 items-start'>
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
        <div className='col-start-1 -col-end-1 order-last md:order-[initial]'>
          <TicketSearch />
        </div>
        <Suspense
          key={`${filterbyuser}-${search}-${status}`}
          fallback={<TicketsCountLabelSkeleton />}
        >
          <TicketsCountLabel
            search={search}
            filterbyuser={filterbyuser}
            status={status}
          />
        </Suspense>
      </div>

      <Suspense fallback={<Spinner />}>
        <ActiveFilters />
      </Suspense>
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
      <Suspense
        key={`${sortby}-${sortdir}-${filterbyuser}-${search}-${status}`}
        fallback={<TicketsGridSkeleton />}
      >
        <TicketsGrid
          sortby={sortby}
          sortdir={sortdir}
          search={search}
          status={status}
          filterbyuser={filterbyuser}
        />
      </Suspense>
    </section>
  );
}
