import TicketsGrid from './TicketsGrid';
import { Suspense } from 'react';
import Spinner from './Spinner';
import TicketsCountLabel from './TicketsCountLabel';

export default async function TicketList() {
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
        <Suspense fallback={<Spinner />}>
          <TicketsCountLabel />
        </Suspense>
      </div>

      <Suspense fallback={<Spinner />}>
        <TicketsGrid />
      </Suspense>
    </section>
  );
}
