'use client';
import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import AssigneesContext, { useAssignees } from './AssigneesContext';
import { TicketData } from '@/lib/types';
import TicketAssigneeList from './ticket/TicketAssigneeList';
import AssigneeSearch from './AssigneeSearch';

export type HandleSearchAssignee = (name: string) => Promise<
  | []
  | {
      email: string | null;
      id: string;
      username: string | null;
    }[]
>;

interface AssigneesSelectProps {
  assigneesList: TicketData['ticket_assignees'];
  handleSearch: HandleSearchAssignee;
  ticketId: TicketData['id'];
}

export default function AssigneesSelect({
  assigneesList,
  handleSearch,
  ticketId,
}: AssigneesSelectProps) {
  return (
    <AssigneesContext initialAssigneesList={assigneesList} ticketId={ticketId}>
      <AssigneesSelectContent handleSearch={handleSearch} />
    </AssigneesContext>
  );
}

interface AssigneesSelectContentProps {
  handleSearch: HandleSearchAssignee;
}

function AssigneesSelectContent({ handleSearch }: AssigneesSelectContentProps) {
  const { isOpen, toggleOpen, assigneesList, addOrRemoveAssignee } =
    useAssignees();
  return (
    <div className='relative mt-3 inline-flex'>
      <button
        type='button'
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-haspopup='listbox'
        aria-label='Manage ticket assignees'
        className='group inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-left text-xs font-medium text-zinc-600 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
      >
        {assigneesList.length > 0 ? (
          <TicketAssigneeList assignees={assigneesList} compact />
        ) : (
          <span className='flex size-6 items-center justify-center rounded-full border border-dashed border-zinc-300 text-zinc-400'>
            +
          </span>
        )}
        <span>
          {assigneesList.length > 0 ? 'Edit assignees' : 'Assign people'}
        </span>
        <ChevronDownIcon
          aria-hidden='true'
          className={`size-3.5 text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div
          role='dialog'
          aria-label='Manage ticket assignees'
          className='absolute top-[calc(100%+0.5rem)] left-0 z-20 w-[min(16rem,calc(100vw-2.5rem))] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-[0_16px_32px_-16px_rgba(24,24,27,0.35)]'
        >
          <div className='border-b border-zinc-100 px-4 py-3'>
            <p className='text-sm font-semibold text-zinc-900'>Assign people</p>
            <p className='mt-0.5 text-xs text-zinc-500'>
              Choose who should own this ticket.
            </p>
          </div>
          <ul
            role='listbox'
            aria-label='Current assignees'
            className='max-h-44 overflow-y-auto p-1.5'
          >
            {assigneesList.map(assignee => (
              <li key={assignee.profile_id}>
                <button
                  onClick={() => addOrRemoveAssignee(assignee)}
                  type='button'
                  role='option'
                  aria-selected='true'
                  className='flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm text-zinc-700 transition hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500'
                >
                  <span className='flex size-7 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-semibold uppercase text-white'>
                    {(assignee.profile.username ?? '?').slice(0, 2)}
                  </span>
                  <span className='min-w-0 flex-1 truncate'>
                    {assignee.profile.username ?? 'Unnamed user'}
                  </span>
                  <span className='text-xs font-medium text-blue-600'>
                    Assigned
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <div className='border-t border-zinc-100 p-3'>
            <AssigneeSearch handleSearch={handleSearch} />
          </div>
        </div>
      )}
    </div>
  );
}
