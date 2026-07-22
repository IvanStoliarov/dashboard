import SortBySelect from './SortBySelect';
import SortByDirection from './SortByDirection';
import { Suspense } from 'react';
import SortBySelectSkeleton from './SortBySelectSkeleton';
import SortByDirectionSkeleton from './SortByDirectionSkeleton';

export default function SortBy() {
  return (
    <div className='flex flex-col items-start gap-2 sm:flex-row sm:items-center'>
      <label
        htmlFor='sortby'
        className='text-xs font-medium uppercase tracking-[0.08em] text-zinc-400 block'
      >
        Sort by
      </label>
      <div className='flex gap-2'>
        <Suspense fallback={<SortBySelectSkeleton />}>
          <SortBySelect />
        </Suspense>
        <Suspense fallback={<SortByDirectionSkeleton />}>
          <SortByDirection />
        </Suspense>
      </div>
    </div>
  );
}
