'use client';

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
        className='border rounded-xs w-full bg-white px-2 py-1 text-left flex items-center justify-between gap-2 disabled:cursor-wait disabled:opacity-60'
      >
        <span
          className={selected.length === 0 ? 'text-neutral-500' : undefined}
        >
          {displayValue}
        </span>
        <span aria-hidden='true' className='text-xs text-neutral-500'>
          ▼
        </span>
      </button>

      {open && (
        <ul
          role='listbox'
          aria-multiselectable='true'
          className='absolute z-10 mt-1 w-full max-h-48 overflow-auto border rounded-xs bg-white shadow-sm'
        >
          {users.map(user => {
            const isSelected = selected.includes(user.id);

            return (
              <li key={user.id} role='option' aria-selected={isSelected}>
                <button
                  type='button'
                  onClick={() => toggleUser(user.id)}
                  disabled={isPending}
                  className={`w-full cursor-pointer px-2 py-1 text-left disabled:cursor-wait disabled:opacity-60 ${
                    isSelected
                      ? 'bg-neutral-200 font-medium text-neutral-950 hover:bg-neutral-200'
                      : 'hover:bg-neutral-100'
                  }`}
                >
                  {getUserLabel(user)}
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
