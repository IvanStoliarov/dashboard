'use client';
import { searchTickets } from '@/lib/actions';
import SearchSuggestions from './SearchSuggestions';
import { ChangeEvent, useRef, useState, useTransition } from 'react';
import { TicketData } from '@/lib/types';
import useOutsideClick from '@/hooks/useOutsideClick';
import {
  ArrowPathIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function TicketSearch() {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const lastSearchId = useRef(0);
  const [isPending, startTransition] = useTransition();
  const ref = useOutsideClick<HTMLFormElement>(reset);
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialValue = searchParams.get('search') || undefined;
  const hasAppliedSearch = Boolean(initialValue?.trim());

  function reset() {
    setTickets([]);
  }

  async function handleChange(
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) {
    const searchId = ++lastSearchId.current;
    const value = e.target.value;

    if (value.length === 0) return setTickets([]);

    startTransition(async () => {
      await new Promise(res => setTimeout(res, 500));
      if (searchId !== lastSearchId.current) return;

      const { data } = await searchTickets({ query: value });
      if (searchId !== lastSearchId.current) return;
      startTransition(() => {
        setTickets(data ?? []);
      });
    });
  }

  function handleSubmit(formData: FormData) {
    const query = String(formData.get('search')).trim();
    const params = new URLSearchParams(searchParams);
    if (query?.length > 0) {
      params.set('search', query);
    } else {
      params.delete('search');
    }

    router.push(`${pathName}?${params}`);
  }
  return (
    <form ref={ref} className='w-full sm:w-72' action={handleSubmit}>
      <label htmlFor='search' className='sr-only'>
        Search tickets
      </label>
      <div className='relative'>
        <MagnifyingGlassIcon
          aria-hidden='true'
          className={`pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 ${
            hasAppliedSearch ? 'text-blue-600' : 'text-zinc-400'
          }`}
        />
        <input
          onChange={handleChange}
          defaultValue={initialValue}
          type='search'
          name='search'
          id='search'
          placeholder='Search tickets'
          aria-busy={isPending}
          aria-describedby={
            hasAppliedSearch ? 'ticket-search-filter-status' : undefined
          }
          className={`h-10 rounded-lg pl-9 pr-9 text-sm text-zinc-900 shadow-sm transition-[border-color,box-shadow,background-color] placeholder:text-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${
            hasAppliedSearch
              ? 'border-blue-300 bg-blue-50/60'
              : 'border-zinc-200 bg-white'
          }`}
        />
        {hasAppliedSearch && (
          <>
            <span
              aria-hidden='true'
              className='pointer-events-none absolute -right-1 -top-1 size-2.5 rounded-full bg-blue-600 ring-2 ring-white'
            />
            <span id='ticket-search-filter-status' className='sr-only'>
              Search filter applied
            </span>
          </>
        )}
        {isPending && (
          <ArrowPathIcon
            aria-hidden='true'
            className='pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 animate-spin text-blue-500'
          />
        )}
        <SearchSuggestions tickets={tickets} isPending={isPending} />
      </div>
    </form>
  );
}
