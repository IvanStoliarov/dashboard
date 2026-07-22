'use client';

import {
  use,
  useDeferredValue,
  useEffect,
  useState,
  useTransition,
} from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { HandleSearchAssignee } from './AssigneesSelect';
import { useAssignees } from './AssigneesContext';
import Button from './Button';
import { TicketAssignee } from '@/lib/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface AssigneeSearchProps {
  handleSearch: HandleSearchAssignee;
  asFormElement: boolean;
  asFilter: boolean;
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
}: AssigneeSearchProps) {
  const {
    assigneesList,
    assigneeListChanged,
    addOrRemoveAssignee,
    ticketId,
    updateList,
    isLoading,
    saveError,
    handleReset,
  } = useAssignees();
  const [users, setUsers] = useState<Users>([]);
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const path = usePathname();
  const router = useRouter();

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

  function handleClick(user: TicketAssignee) {
    addOrRemoveAssignee(user);
  }

  function handleSave() {
    if (asFilter) {
      const params = new URLSearchParams(searchParams);
      if (assigneesList.length > 0) {
        params.set(
          'filterbyuser',
          assigneesList.map(user => user.profile_id).join(','),
        );
      } else {
        params.delete('filterbyuser');
      }
      router.push(`${path}?${params}`);
    } else {
      updateList(ticketId);
    }
  }

  const userList = users.map(user => {
    const isAssigned = assigneesList.map(el => el.profile_id).includes(user.id);
    const displayName = user.username ?? user.email ?? 'Unnamed user';
    const profile = {
      profile: { id: user.id, username: user.username },
      profile_id: user.id,
    };

    return (
      <li key={user.id}>
        <button
          type='button'
          onClick={() => handleClick(profile)}
          aria-pressed={isAssigned}
          className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 ${isAssigned ? 'bg-blue-50 text-blue-900' : 'text-zinc-700 hover:bg-zinc-50'}`}
        >
          <span
            className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold uppercase ${isAssigned ? 'bg-blue-600 text-white' : 'bg-zinc-100 text-zinc-600'}`}
          >
            {displayName.slice(0, 2)}
          </span>
          <span className='min-w-0 flex-1 truncate'>{displayName}</span>
          {isAssigned && (
            <span className='text-xs font-medium text-blue-600'>Assigned</span>
          )}
        </button>
      </li>
    );
  });

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
          id='assignee-search'
          name='query'
          value={query}
          onChange={e => setQuery(e.target.value)}
          type='search'
          placeholder='Search by name or email'
          className='h-9 rounded-lg border-zinc-200 bg-zinc-50 pl-9 pr-3 text-sm placeholder:text-zinc-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20'
        />
      </div>
      <ul
        aria-live='polite'
        className={`flex max-h-44 flex-col gap-0.5 overflow-y-auto ${isPending ? 'opacity-40' : ''}`}
      >
        {userList}
        {!isPending && query.length > 0 && users.length === 0 && (
          <li className='px-2.5 py-3 text-center text-xs text-zinc-500'>
            No teammates found.
          </li>
        )}
      </ul>
      {assigneeListChanged && !asFormElement && (
        <div className='flex gap-2'>
          <Button
            variant='secondary'
            disabled={isLoading}
            onClick={handleReset}
          >
            Cancel
          </Button>
          <Button disabled={isLoading} onClick={handleSave}>
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      )}
      {saveError && (
        <p role='alert' className='text-xs text-red-600'>
          {saveError}
        </p>
      )}
    </div>
  );
}
