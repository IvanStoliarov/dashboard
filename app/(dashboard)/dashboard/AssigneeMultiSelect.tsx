'use client';

import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { updateTicketAssignee } from '@/lib/actions';
import { Profile } from '@/lib/types';
import { useEffect, useId, useRef, useState, useTransition } from 'react';

interface AssigneeMultiSelectProps {
  id?: string;
  name: string;
  users: Profile[];
  defaultValue: string[];
}

function getUserLabel(user: Profile) {
  return user.username ?? user.email ?? 'Unnamed user';
}

export default function AssigneeMultiSelect({
  id: idProp,
  name,
  users,
  defaultValue,
}: AssigneeMultiSelectProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const selectedLabels = selected
    .map(userId => users.find(user => user.id === userId))
    .filter((user): user is Profile => Boolean(user))
    .map(getUserLabel);

  const displayValue =
    selectedLabels.length > 0 ? selectedLabels.join(', ') : 'Unassigned';

  function toggleUser(userId: string) {
    const nextSelected = selected.includes(userId)
      ? selected.filter(id => id !== userId)
      : [...selected, userId];

    setSelected(nextSelected);

    const form = containerRef.current?.closest('form');
    if (!form) {
      return;
    }

    const formData = new FormData(form);
    formData.delete(name);
    nextSelected.forEach(selectedUserId => {
      formData.append(name, selectedUserId);
    });

    startTransition(async () => {
      await updateTicketAssignee(formData);
    });
  }

  return (
    <div ref={containerRef} className='relative w-full'>
      <button
        type='button'
        id={id}
        aria-haspopup='listbox'
        aria-expanded={open}
        onClick={() => setOpen(current => !current)}
        disabled={isPending}
        className='flex min-h-9 w-full items-center justify-between gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-left text-sm text-zinc-800 shadow-sm transition hover:border-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-1 disabled:cursor-wait disabled:opacity-60'
      >
        <span
          className={`truncate ${selected.length === 0 ? 'text-zinc-400' : ''}`}
        >
          {displayValue}
        </span>
        <ChevronDownIcon
          aria-hidden='true'
          className={`size-4 shrink-0 text-zinc-400 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <ul
          role='listbox'
          aria-multiselectable='true'
          className='absolute z-20 mt-1.5 max-h-52 w-full overflow-auto rounded-xl border border-zinc-200 bg-white p-1.5 shadow-xl shadow-zinc-950/10'
        >
          {users.map(user => {
            const isSelected = selected.includes(user.id);

            return (
              <li key={user.id} role='option' aria-selected={isSelected}>
                <button
                  type='button'
                  onClick={() => toggleUser(user.id)}
                  disabled={isPending}
                  className={`flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition disabled:cursor-wait disabled:opacity-60 ${
                    isSelected
                      ? 'bg-zinc-100 font-medium text-zinc-950'
                      : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950'
                  }`}
                >
                  <span
                    className={`flex size-5 shrink-0 items-center justify-center rounded border ${
                      isSelected
                        ? 'border-zinc-900 bg-zinc-900 text-white'
                        : 'border-zinc-300 bg-white text-transparent'
                    }`}
                  >
                    <CheckIcon aria-hidden='true' className='size-3' />
                  </span>
                  <span className='truncate'>{getUserLabel(user)}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {selected.map(userId => (
        <input key={userId} type='hidden' name={name} value={userId} />
      ))}
    </div>
  );
}
