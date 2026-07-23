'use client';

import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='mx-auto flex min-h-80 max-w-xl items-center justify-center px-4 py-12 text-center'>
      <div>
        <span className='mx-auto flex size-12 items-center justify-center rounded-full bg-red-50 text-red-600'>
          <ExclamationTriangleIcon className='size-6' aria-hidden='true' />
        </span>
        <h2 className='mt-4 text-xl font-semibold tracking-tight text-zinc-950'>
          Something went wrong
        </h2>
        <p className='mt-2 text-sm leading-6 text-zinc-500'>
          We couldn&apos;t load this page. The problem may be temporary.
        </p>
        <button
          type='button'
          onClick={unstable_retry}
          className='mt-6 rounded-lg bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950'
        >
          Try again
        </button>
      </div>
    </div>
  );
}
