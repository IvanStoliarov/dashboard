'use client';

import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { type KeyboardEvent, type ReactNode, useEffect, useId, useRef } from 'react';
import { SelectProvider, useSelect } from '@/lib/hooks/useSelect';

interface SelectProps {
  ariaLabel: string;
  children: ReactNode;
  position?: 'right' | 'left';
  trigger: ReactNode;
}

export default function Select({
  ariaLabel,
  children,
  position = 'left',
  trigger,
}: SelectProps) {
  return (
    <SelectProvider>
      <SelectContent ariaLabel={ariaLabel} position={position} trigger={trigger}>
        {children}
      </SelectContent>
    </SelectProvider>
  );
}

function SelectContent({ ariaLabel, children, position, trigger }: SelectProps) {
  const { isOpen, close, toggle } = useSelect();
  const selectRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!selectRef.current?.contains(event.target as Node)) close();
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [close]);

  useEffect(() => {
    if (!isOpen) return;
    window.requestAnimationFrame(() =>
      menuRef.current
        ?.querySelector<HTMLButtonElement>('button:not(:disabled)')
        ?.focus(),
    );
  }, [isOpen]);

  function closeAndRestoreFocus() {
    close();
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const items = Array.from(
      menuRef.current?.querySelectorAll<HTMLButtonElement>(
        'button:not(:disabled)',
      ) ?? [],
    );
    const currentIndex = items.indexOf(
      document.activeElement as HTMLButtonElement,
    );

    if (event.key === 'Escape') {
      event.preventDefault();
      closeAndRestoreFocus();
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const nextIndex =
        event.key === 'ArrowDown'
          ? (currentIndex + 1) % items.length
          : (currentIndex - 1 + items.length) % items.length;
      items[nextIndex]?.focus();
    } else if (event.key === 'Home') {
      event.preventDefault();
      items.at(0)?.focus();
    } else if (event.key === 'End') {
      event.preventDefault();
      items.at(-1)?.focus();
    }
  }

  return (
    <div ref={selectRef} className='relative inline-flex'>
      <button
        ref={triggerRef}
        type='button'
        aria-expanded={isOpen}
        aria-haspopup='menu'
        aria-controls={menuId}
        aria-label={ariaLabel}
        onClick={toggle}
        className={`group inline-flex items-center gap-1.5 rounded-lg border bg-white px-1.5 py-1 outline-none transition hover:cursor-pointer hover:border-zinc-400 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${isOpen ? 'border-zinc-400 shadow-sm ring-2 ring-zinc-200' : 'border-zinc-200'}`}
      >
        {trigger}
        <ChevronDownIcon
          aria-hidden='true'
          className={`size-4 text-zinc-400 transition-transform group-hover:text-zinc-600 ${isOpen ? 'rotate-180 text-zinc-600' : ''}`}
        />
      </button>
      {isOpen && (
        <div
          ref={menuRef}
          id={menuId}
          role='menu'
          aria-label={ariaLabel}
          onKeyDown={handleKeyDown}
          className={`absolute top-[calc(100%+0.5rem)] z-10 min-w-40 rounded-xl border border-zinc-200 bg-white p-1.5 shadow-[0_16px_32px_-16px_rgba(24,24,27,0.35)] [&_ul]:space-y-0.5 ${position === 'left' ? 'left-0' : 'right-0'}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
