import type { CSSProperties } from 'react';

const STATUS_COLUMN_COUNT = 4;
const CARD_COUNT = 2;

export default function TicketsGridSkeleton() {
  return (
    <div
      aria-hidden='true'
      className='grid grid-cols-1 gap-4 lg:grid-cols-[repeat(var(--status-count),minmax(0,1fr))]'
      style={{ '--status-count': STATUS_COLUMN_COUNT } as CSSProperties}
    >
      {Array.from({ length: STATUS_COLUMN_COUNT }, (_, columnIndex) => (
        <div
          key={columnIndex}
          className='rounded-2xl border border-zinc-200 bg-zinc-50/70 p-3'
        >
          <div className='mb-3 flex items-center justify-between gap-3 px-1'>
            <span className='h-5 w-20 animate-pulse rounded bg-zinc-200' />
            <span className='size-6 animate-pulse rounded-full bg-zinc-200' />
          </div>
          <div className='grid gap-3'>
            {Array.from({ length: CARD_COUNT }, (_, cardIndex) => (
              <div
                key={cardIndex}
                className='rounded-2xl border border-zinc-200 bg-white p-5'
              >
                <div className='mb-3 flex items-center gap-2.5'>
                  <div className='flex flex-col items-start gap-1.5'>
                    <span className='h-5 w-14 animate-pulse rounded-full bg-zinc-100' />
                    <div className='flex items-center gap-1.5'>
                      <span className='size-3.5 animate-pulse rounded bg-zinc-100' />
                      <span className='h-3 w-7 animate-pulse rounded bg-zinc-100' />
                      <span className='h-6 w-24 animate-pulse rounded-md border border-zinc-200 bg-zinc-50' />
                    </div>
                  </div>
                  <div className='flex items-center gap-1.5'>
                    <span className='size-3.5 animate-pulse rounded bg-zinc-100' />
                    <span className='h-3 w-12 animate-pulse rounded bg-zinc-100' />
                    <span className='h-3 w-16 animate-pulse rounded bg-zinc-100' />
                  </div>
                  <span className='h-3 w-8 animate-pulse rounded bg-zinc-100' />
                </div>
                <span className='block h-5 w-4/5 animate-pulse rounded bg-zinc-100' />
                <span className='mt-2 block h-4 w-full animate-pulse rounded bg-zinc-100' />
                <span className='mt-1 block h-4 w-3/5 animate-pulse rounded bg-zinc-100' />
                <div className='mt-4 flex items-center'>
                  <span className='size-7 animate-pulse rounded-full bg-zinc-100' />
                  <span className='-ml-1.5 size-7 animate-pulse rounded-full bg-zinc-100' />
                  <span className='ml-2.5 h-3 w-20 animate-pulse rounded bg-zinc-100' />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
