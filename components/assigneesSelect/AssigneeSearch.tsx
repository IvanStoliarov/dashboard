'use client';

import { useDeferredValue, useEffect, useState, useTransition } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { HandleSearchAssignee } from './AssigneesSelect';
import SearchResults from './SearchResults';
import Actions from './Actions';
import Error from './Error';

interface AssigneeSearchProps {
  handleSearch: HandleSearchAssignee;
  asFormElement: boolean;
  asFilter: boolean;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

type User = {
  email: string | null;
  id: string;
  username: string | null;
};

type Users = [] | User[];

const cache = new Map();

const getData = async (searchQuery: string, promise: HandleSearchAssignee) => {
  if (!cache.has(searchQuery)) {
    cache.set(searchQuery, await promise(searchQuery));
  }
  return cache.get(searchQuery);
};

export default function AssigneeSearch({
  handleSearch,
  asFormElement,
  asFilter,
  inputRef,
}: AssigneeSearchProps) {
  const [users, setUsers] = useState<Users>([]);
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let canceled = false;
    const updateUsers = async (
      value: string,
      handleSearch: HandleSearchAssignee,
    ) => {
      const data = value?.length > 0 ? await getData(value, handleSearch) : [];
      if (!canceled) {
        setUsers(data);
      }
    };
    startTransition(() => {
      updateUsers(deferredQuery, handleSearch);
    });
    return () => {
      canceled = true;
    };
  }, [deferredQuery, handleSearch]);

  return (
    <div className='space-y-2'>
      <label
        htmlFor='assignee-search'
        className='text-xs font-medium text-zinc-700'
      >
        Search teammates
      </label>
      <div className='relative'>
        <MagnifyingGlassIcon
          aria-hidden='true'
          className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400'
        />
        <input
          ref={inputRef}
          id='assignee-search'
          name='query'
          value={query}
          onChange={e => setQuery(e.target.value)}
          type='search'
          placeholder='Search by name or email'
          aria-describedby='assignee-search-status'
          className='h-9 rounded-lg border-zinc-200 bg-zinc-50 pl-9 pr-3 text-sm placeholder:text-zinc-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20'
        />
      </div>

      <SearchResults users={users} isPending={isPending} query={query} />

      <Actions asFilter={asFilter} asFormElement={asFormElement} />
      <Error />
    </div>
  );
}
