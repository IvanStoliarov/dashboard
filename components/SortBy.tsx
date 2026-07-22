'use client';

import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent } from 'react';

export default function SortBy() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const sortBy = searchParams.get('sortby');
  const direction = searchParams.get('sortdir');

  const currentSortBy = sortBy || 'due-to';
  const currentSortDirection = direction || 'asc';

  function changeHandler(e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>) {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);
    if (value === 'due-to') {
      params.delete('sortby');
    } else {
      params.set('sortby', value);
    }
    router.push(`${pathName}?${params}`);
  }

  function handleChangeDirection() {
    const params = new URLSearchParams(searchParams);
    const currentValue = params.get('sortdir') || 'asc';
    if (currentValue === 'asc') {
      params.set('sortdir', 'desc');
    } else {
      params.delete('sortdir');
    }
    router.push(`/dashboard?${params}`);
  }

  return (
    <div className='flex flex-col items-start gap-2 sm:flex-row sm:items-center'>
      <label
        htmlFor='sortby'
        className='text-xs font-medium uppercase tracking-[0.08em] text-zinc-400 block'
      >
        Sort by
      </label>
      <div className='relative'>
        <select
          defaultValue={currentSortBy}
          onChange={changeHandler}
          name='sortby'
          id='sortby'
          aria-label='Sort tickets by'
          className='h-9 appearance-none rounded-lg border border-zinc-200 bg-white py-2 pl-3 pr-9 text-sm font-medium text-zinc-700 shadow-xs outline-none transition-colors hover:border-zinc-300 hover:bg-zinc-50 focus-visible:border-zinc-400 focus-visible:ring-2 focus-visible:ring-zinc-200 focus-visible:ring-offset-1'
        >
          <option value='due-to'>Due date</option>
          <option value='date'>Date created</option>
        </select>
        <ChevronDownIcon
          aria-hidden='true'
          className='pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-zinc-400'
        />
      </div>
      <button
        type='button'
        onClick={handleChangeDirection}
        aria-label={`Sort ${currentSortDirection === 'asc' ? 'ascending' : 'descending'}; activate to change direction`}
        className='h-9 rounded-md px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2'
      >
        {currentSortDirection === 'asc' ? (
          <ArrowDownIcon aria-hidden='true' className='size-4' />
        ) : (
          <ArrowUpIcon aria-hidden='true' className='size-4' />
        )}
      </button>
    </div>
  );
}
