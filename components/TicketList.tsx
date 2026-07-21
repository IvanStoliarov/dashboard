import TicketsGrid from './TicketsGrid';
import { Suspense } from 'react';
import TicketsCountLabel from './TicketsCountLabel';
import TicketsCountLabelSkeleton from './TicketsCountLabelSkeleton';
import TicketsGridSkeleton from './TicketsGridSkeleton';

export default async function TicketList({
  sortby = 'due-to',
  sortdir = 'asc',
}: {
  sortby: string | undefined;
  sortdir: string | undefined;
}) {
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
        <Suspense fallback={<TicketsCountLabelSkeleton />}>
          <TicketsCountLabel />
        </Suspense>
      </div>

      <Suspense key={sortby + sortdir} fallback={<TicketsGridSkeleton />}>
        <TicketsGrid sortby={sortby} sortdir={sortdir} />
      </Suspense>
    </section>
  );
}
