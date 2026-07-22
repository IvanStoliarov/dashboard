'use client';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import AssigneesContext, { useAssignees } from './AssigneesContext';
import { TicketData } from '@/lib/types';
import TicketAssigneeList from './ticket/TicketAssigneeList';
import AssigneeSearch from './AssigneeSearch';
import useOutsideClick from '@/hooks/useOutsideClick';
import { useEffect, useId, useRef } from 'react';

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
  asFormElement?: boolean;
  label?: string;
  asFilter?: boolean;
}

export default function AssigneesSelect({
  assigneesList,
  handleSearch,
  ticketId,
  asFormElement = false,
  label,
  asFilter = false,
}: AssigneesSelectProps) {
  return (
    <AssigneesContext initialAssigneesList={assigneesList} ticketId={ticketId}>
      <AssigneesSelectContent
        asFilter={asFilter}
        asFormElement={asFormElement}
        handleSearch={handleSearch}
        label={label}
      />
    </AssigneesContext>
  );
}

interface AssigneesSelectContentProps {
  handleSearch: HandleSearchAssignee;
  asFormElement: boolean;
  label?: string;
  asFilter: boolean;
}

function AssigneesSelectContent({
  handleSearch,
  asFormElement,
  label,
  asFilter,
}: AssigneesSelectContentProps) {
  const { isOpen, toggleOpen, assigneesList, addOrRemoveAssignee, close } =
    useAssignees();

  const ref = useOutsideClick<HTMLDivElement>(close, false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const popupId = useId();

  useEffect(() => {
    if (isOpen) {
      window.requestAnimationFrame(() => searchRef.current?.focus());
    }
  }, [isOpen]);

  function closeAndRestoreFocus() {
    close();
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }

  return (
    <div
      ref={ref}
      className={`relative inline-flex gap-2 ${asFilter ? 'flex-col items-start sm:flex-row sm:items-center' : 'items-center'}`}
    >
      {label && (
        <span
          id={`${popupId}-label`}
          className='block text-xs font-medium uppercase tracking-[0.08em] text-zinc-400'
        >
          {label}
        </span>
      )}
      {assigneesList.map(user => (
        <input
          key={user.profile_id}
          type='hidden'
          name='assigned_to'
          value={user.profile_id}
        />
      ))}
      <button
        ref={triggerRef}
        id={popupId}
        type='button'
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-controls={`${popupId}-dialog`}
        aria-haspopup='dialog'
        aria-describedby={label ? `${popupId}-label` : undefined}
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
          {assigneesList.length > 0 ? 'Edit assignees' : 'Assigned people'}
        </span>
        <ChevronDownIcon
          aria-hidden='true'
          className={`size-3.5 text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div
          id={`${popupId}-dialog`}
          role='dialog'
          aria-modal='false'
          aria-label='Manage ticket assignees'
          onKeyDown={event => {
            if (event.key === 'Escape') {
              event.preventDefault();
              closeAndRestoreFocus();
            }
          }}
          className='absolute top-[calc(100%+0.5rem)] right-0 z-20 w-[min(16rem,calc(100vw-2.5rem))] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-[0_16px_32px_-16px_rgba(24,24,27,0.35)]'
        >
          <div className='border-b border-zinc-100 px-4 py-3'>
            <p className='text-sm font-semibold text-zinc-900'>Assign people</p>
            <p className='mt-0.5 text-xs text-zinc-500'>
              Choose who should own this ticket.
            </p>
          </div>
          <ul aria-label='Current assignees' className='max-h-44 overflow-y-auto p-1.5'>
            {assigneesList.map(assignee => (
              <li key={assignee.profile_id}>
                <button
                  onClick={() => addOrRemoveAssignee(assignee)}
                  type='button'
                  aria-pressed='true'
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
            <AssigneeSearch
              inputRef={searchRef}
              asFormElement={asFormElement}
              handleSearch={handleSearch}
              asFilter={asFilter}
            />
          </div>
        </div>
      )}
    </div>
  );
}
