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
import { SearchParamsPromise } from '@/lib/types';
import ActiveFilters from './board/ActiveFilters';
import Spinner from './Spinner';
import { getSearchParamsValue } from '@/lib/getSearchParamsValue';

export default async function TicketList({
  searchParamsPromise,
}: {
  searchParamsPromise: SearchParamsPromise;
}) {
  const searchParams = await searchParamsPromise;
  const searchParamsString = JSON.stringify(
    Object.entries(searchParams).sort(([keyA], [keyB]) =>
      keyA.localeCompare(keyB),
    ),
  );
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
          key={`count-${searchParamsString}`}
          fallback={<TicketsCountLabelSkeleton />}
        >
          <TicketsCountLabel searchParams={searchParams} />
        </Suspense>
      </div>

      <Suspense
        key={`active-filters-${searchParamsString}`}
        fallback={<Spinner />}
      >
        <ActiveFilters />
      </Suspense>
      <div className='flex flex-col gap-4 py-3 md:flex-row md:items-center md:justify-between'>
        <div>
          <Suspense
            key={`assignees-${searchParamsString}`}
            fallback={<AssigneeSelectSkeleton />}
          >
            <AssigneeSelectWrapper
              filterbyuser={getSearchParamsValue(searchParams?.filterbyuser)}
            >
              {({ assigneeList }) => (
                <AssigneesSelect
                  key={getSearchParamsValue(searchParams?.filterbyuser)}
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
        key={`grid-${searchParamsString}`}
        fallback={<TicketsGridSkeleton />}
      >
        <TicketsGrid searchParams={searchParams} />
      </Suspense>
    </section>
  );
}
