export default function NewTicketFormSkeleton() {
  return (
    <div
      aria-busy='true'
      aria-label='Loading new ticket form'
      className='mt-8 space-y-6'
      role='status'
    >
      <span className='sr-only'>Loading new ticket form</span>

      <div aria-hidden='true' className='space-y-6'>
        <div>
          <span className='mb-2 block h-5 w-12 animate-pulse rounded bg-zinc-100' />
          <span className='block h-11 w-full animate-pulse rounded-lg border border-zinc-200 bg-zinc-50' />
        </div>

        <div>
          <span className='mb-2 block h-5 w-24 animate-pulse rounded bg-zinc-100' />
          <span className='block h-[190px] w-full animate-pulse rounded-lg border border-zinc-200 bg-zinc-50' />
        </div>

        <div className='flex h-[38px] w-40 animate-pulse items-center gap-2 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5'>
          <span className='size-6 rounded-full border border-zinc-200 bg-zinc-100' />
          <span className='h-3 w-20 rounded bg-zinc-100' />
          <span className='ml-auto size-3.5 rounded bg-zinc-100' />
        </div>

        <div className='flex h-[26px] items-center gap-1.5'>
          <span className='size-3.5 animate-pulse rounded bg-zinc-100' />
          <span className='h-3 w-7 animate-pulse rounded bg-zinc-100' />
          <span className='flex h-[26px] w-24 animate-pulse items-center rounded-md border border-zinc-200 bg-zinc-50' />
        </div>

        <div className='flex justify-end border-t border-zinc-100 pt-6'>
          <span className='h-9 w-28 animate-pulse rounded-lg bg-zinc-200' />
        </div>
      </div>
    </div>
  );
}
