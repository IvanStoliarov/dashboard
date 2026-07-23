import React from 'react';
import UserButton from './UserButton';

type User = {
  email: string | null;
  id: string;
  username: string | null;
};

type Users = [] | User[];

interface SearchResultsProps {
  users: Users;
  isPending: boolean;
  query: string;
}

export default function SearchResults({
  users,
  isPending,
  query,
}: SearchResultsProps) {
  return (
    <>
      <ul
        className={`flex max-h-44 flex-col gap-0.5 overflow-y-auto ${isPending ? 'opacity-40' : ''}`}
      >
        {users.map(user => (
          <UserButton key={user.id} user={user} />
        ))}
        {users.length === 0 && (
          <li className='px-2.5 py-3 text-center text-xs text-zinc-500'>
            {query.length === 0 && 'Start typing...'}
            {query.length > 0 && 'No teammates found.'}
          </li>
        )}
      </ul>
      <p
        id='assignee-search-status'
        className='sr-only'
        role='status'
        aria-live='polite'
      >
        {isPending
          ? 'Searching teammates'
          : query.length > 0
            ? `${users.length} teammate${users.length === 1 ? '' : 's'} found`
            : 'Type a name or email to search teammates'}
      </p>
    </>
  );
}
