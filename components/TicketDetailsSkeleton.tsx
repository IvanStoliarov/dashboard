const metadataRows = [
  { labelWidth: 'w-16', valueWidth: 'w-24' },
  { labelWidth: 'w-12', valueWidth: 'w-28' },
  { labelWidth: 'w-20', valueWidth: 'w-32' },
  { labelWidth: 'w-16', valueWidth: 'w-24' },
  { labelWidth: 'w-14', valueWidth: 'w-full' },
];

export default function TicketDetailsSkeleton() {
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
              <div className='mt-1 flex h-[38px] w-40 animate-pulse items-center gap-2 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5'>
                <span className='size-6 rounded-full border border-zinc-200 bg-zinc-100' />
                <span className='h-3 w-20 rounded bg-zinc-100' />
                <span className='ml-auto size-3.5 rounded bg-zinc-100' />
              </div>
            </div>
            <span className='h-[34px] w-28 animate-pulse rounded-lg border border-zinc-200 bg-zinc-50' />
          </div>
        </div>

        <div className='grid gap-8 px-5 py-6 sm:px-7 lg:grid-cols-[minmax(0,1fr)_15rem]'>
          <div>
            <div>
              <span className='block h-5 w-12 animate-pulse rounded bg-zinc-100' />
              <span className='mt-2 block h-[38px] w-full animate-pulse rounded-lg border border-zinc-200 bg-zinc-50' />
            </div>
            <div>
              <span className='block h-5 w-24 animate-pulse rounded bg-zinc-100' />
              <span className='mt-2 block h-[186px] w-full animate-pulse rounded-lg border border-zinc-200 bg-zinc-50' />
            </div>
          </div>

          <aside className='border-t border-zinc-100 pt-6 lg:border-t-0 lg:border-l lg:pl-6 lg:pt-0'>
            <span className='block h-5 w-14 animate-pulse rounded bg-zinc-100' />
            <dl className='mt-4 space-y-4'>
              <div>
                <span className='block h-4 w-16 animate-pulse rounded bg-zinc-100' />
                <span className='mt-1 block h-[34px] w-full animate-pulse rounded-md border border-zinc-200 bg-zinc-50' />
              </div>
              {metadataRows.map((row, index) => (
                <div key={index}>
                  <span
                    className={`block h-4 animate-pulse rounded bg-zinc-100 ${row.labelWidth}`}
                  />
                  <span
                    className={`mt-1 block h-5 animate-pulse rounded bg-zinc-100 ${row.valueWidth}`}
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
