export default function NewTicketFormSkeleton() {
  return (
    <div
      aria-busy='true'
      aria-label='Loading new ticket form'
      className='mt-8 space-y-6'
      role='status'
    >
      <span className='sr-only'>Loading new ticket form</span>

      <div aria-hidden='true'>
        <div>
          <span className='mb-2 block h-4 w-12 animate-pulse rounded bg-zinc-100' />
          <span className='block h-11 w-full animate-pulse rounded-lg border border-zinc-200 bg-zinc-50' />
        </div>

        <div className='mt-6'>
          <span className='mb-2 block h-4 w-24 animate-pulse rounded bg-zinc-100' />
          <span className='block h-36 w-full animate-pulse rounded-lg border border-zinc-200 bg-zinc-50' />
        </div>

        <div className='mt-6'>
          <span className='mb-2 block h-4 w-16 animate-pulse rounded bg-zinc-100' />
          <span className='block h-11 w-full animate-pulse rounded-lg border border-zinc-200 bg-zinc-50' />
        </div>

        <div className='mt-6 flex justify-end border-t border-zinc-100 pt-6'>
          <span className='h-10 w-32 animate-pulse rounded-lg bg-zinc-200' />
        </div>
      </div>
    </div>
  );
}
