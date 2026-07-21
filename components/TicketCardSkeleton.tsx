const metadataRows = [
  { labelWidth: 'w-16', valueWidth: 'w-full' },
  { labelWidth: 'w-20', valueWidth: 'w-3/4' },
  { labelWidth: 'w-14', valueWidth: 'w-5/6' },
  { labelWidth: 'w-24', valueWidth: 'w-2/3' },
  { labelWidth: 'w-20', valueWidth: 'w-3/4' },
];

export default function TicketCardSkeleton() {
  return (
    <section
      aria-busy='true'
      aria-label='Loading ticket details'
      className='mx-auto max-w-4xl rounded-2xl border border-zinc-200 bg-white shadow-[0_12px_32px_-20px_rgba(0,0,0,0.25)]'
    >
      <span className='sr-only' role='status'>
        Loading ticket details
      </span>
      <div aria-hidden='true'>
        <div className='border-b border-zinc-100 px-5 py-5 sm:px-7'>
          <div className='flex flex-wrap items-center justify-between gap-3'>
            <div>
              <span className='block h-5 w-20 animate-pulse rounded bg-zinc-100' />
              <div className='mt-4 flex items-center'>
                <span className='size-7 animate-pulse rounded-full bg-zinc-100' />
                <span className='-ml-1.5 size-7 animate-pulse rounded-full bg-zinc-100' />
                <span className='-ml-1.5 size-7 animate-pulse rounded-full bg-zinc-100' />
                <span className='ml-2.5 h-3 w-20 animate-pulse rounded bg-zinc-100' />
              </div>
            </div>
            <span className='h-9 w-28 animate-pulse rounded-lg border border-zinc-200 bg-zinc-50' />
          </div>
        </div>

        <div className='grid gap-8 px-5 py-6 sm:px-7 lg:grid-cols-[minmax(0,1fr)_15rem]'>
          <div className='space-y-5'>
            <div>
              <span className='block h-4 w-12 animate-pulse rounded bg-zinc-100' />
              <span className='mt-2 block h-11 w-full animate-pulse rounded-lg border border-zinc-200 bg-zinc-50' />
            </div>
            <div>
              <span className='block h-4 w-24 animate-pulse rounded bg-zinc-100' />
              <span className='mt-2 block h-32 w-full animate-pulse rounded-lg border border-zinc-200 bg-zinc-50' />
            </div>
          </div>

          <aside className='border-t border-zinc-100 pt-6 lg:border-t-0 lg:border-l lg:pl-6 lg:pt-0'>
            <span className='block h-5 w-14 animate-pulse rounded bg-zinc-100' />
            <dl className='mt-4 space-y-4'>
              {metadataRows.map((row, index) => (
                <div key={index}>
                  <span
                    className={`block h-3 animate-pulse rounded bg-zinc-100 ${row.labelWidth}`}
                  />
                  <span
                    className={`mt-2 block h-4 animate-pulse rounded bg-zinc-100 ${row.valueWidth}`}
                  />
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
