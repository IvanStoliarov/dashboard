import { TicketIcon } from '@heroicons/react/24/outline';
import LinkAsButton from '@/components/LinkAsButton';

export default function TicketNotFound() {
  return (
    <section
      aria-labelledby='ticket-not-found-heading'
      className='mx-auto max-w-2xl rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/70 px-6 py-14 text-center sm:px-10'
    >
      <span className='mx-auto mb-5 flex size-12 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-500 shadow-sm'>
        <TicketIcon aria-hidden='true' className='size-5' />
      </span>
      <p className='text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400'>
        404
      </p>
      <h1
        id='ticket-not-found-heading'
        className='mt-2 text-xl font-semibold tracking-tight text-zinc-950'
      >
        Ticket not found
      </h1>
      <p className='mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500'>
        This ticket may have been deleted, or the link may be incorrect.
      </p>
      <div className='mt-6 flex justify-center'>
        <LinkAsButton href='/dashboard'>Back to tickets</LinkAsButton>
      </div>
    </section>
  );
}
