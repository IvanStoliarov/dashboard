'use client';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SortByDirection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const direction = searchParams.get('sortdir');
  const currentSortDirection = direction || 'asc';

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
  );
}
