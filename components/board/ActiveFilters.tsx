'use client';

import { XMarkIcon } from '@heroicons/react/20/solid';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

function getFilterLabel(param: string, value: string | null) {
  if (param === 'filterbyuser') return 'User';
  if (param === 'status') return 'Status';
  if (param === 'deadline' && value === 'outdated') return 'Deadline: Outdated';
  if (param === 'deadline' && value === 'today') return 'Deadline: Due today';
  return null;
}

export default function ActiveFilters() {
  const path = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const paramsToShow = Array.from(params.keys()).filter(
    (key: string) => getFilterLabel(key, params.get(key)) !== null,
  );
  const router = useRouter();
  function handleClick(param: string) {
    params.delete(param);
    router.push(`${path}?${params}`);
  }
  if (paramsToShow.length === 0) return null;

  return (
    <div className='flex min-w-0 flex-col items-start gap-2 py-1 sm:flex-row sm:items-center'>
      <span className='shrink-0 text-xs font-medium text-zinc-500'>
        Filtered by
      </span>
      <ul className='flex min-w-0 max-w-full flex-wrap gap-2'>
        {paramsToShow.map(param => {
          const label = getFilterLabel(param, params.get(param));
          if (!label) return null;

          return (
            <li key={param}>
              <button
                type='button'
                onClick={() => handleClick(param)}
                aria-label={`Remove ${label} filter`}
                className='inline-flex min-h-11 max-w-full items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 text-xs font-medium text-zinc-700 shadow-sm transition-[border-color,background-color,color,box-shadow] hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950 hover:cursor-pointer active:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:min-h-8'
              >
                <span className='truncate'>{label}</span>
                <XMarkIcon
                  aria-hidden='true'
                  className='size-3.5 shrink-0 text-zinc-400'
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
