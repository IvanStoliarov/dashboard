'use client';

import React, { useState } from 'react';
import { Calendar } from 'react-calendar';
import { format, parseISO } from 'date-fns';
import Modal from './Modal';
import { CalendarDaysIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import Button from './Button';
import { updateTicketDueTo } from '@/lib/actions';

interface CalendarPickerProps {
  ticketId?: string;
  initialValue: string | null;
  variant?: 'inline' | 'details';
  describedBy?: string;
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function parseDueDate(value: string) {
  return parseISO(value);
}

export default function CalendarPicker({
  ticketId,
  initialValue,
  variant = 'inline',
  describedBy,
}: CalendarPickerProps) {
  const [value, setValue] = useState<Value>(
    initialValue ? parseDueDate(initialValue) : null,
  );
  const [success, setSuccess] = useState(true);
  const [message, setMessage] = useState('');
  const [newValue, setNewValue] = useState<string | null>(null);
  const initialDate = initialValue
    ? format(parseDueDate(initialValue), 'yyyy-MM-dd')
    : null;
  const selectedDate =
    value instanceof Date ? format(value, 'yyyy-MM-dd') : null;
  const hasChanged = initialDate !== selectedDate;
  const valueToShow = newValue || initialDate;
  const triggerLabel = valueToShow
    ? `Change due date, currently ${format(parseDueDate(valueToShow), 'MMMM d, yyyy')}`
    : 'Set due date';

  function reset() {
    setSuccess(true);
    setMessage('');
    setValue(initialValue ? parseDueDate(initialValue) : null);
  }

  async function updateHandler(func: () => void) {
    if (!ticketId) {
      setNewValue(selectedDate);
      func();
      return;
    }
    const { success, message } = await updateTicketDueTo(
      ticketId,
      selectedDate,
    );
    setSuccess(success);
    setMessage(message);
  }
  return (
    <Modal onCloseCallback={reset}>
      <input
        type='hidden'
        name='due_to_date'
        value={valueToShow || ''}
      />
      <Modal.Trigger ariaLabel={triggerLabel} ariaDescribedBy={describedBy}>
        <span
          className={
            variant === 'details'
              ? 'group inline-flex w-full items-center gap-3 py-1 text-left text-sm text-zinc-600'
              : 'group inline-flex items-center gap-1.5 text-xs text-zinc-500'
          }
        >
          <span className='inline-flex items-center gap-1.5'>
            <CalendarDaysIcon aria-hidden='true' className='size-3.5' />
            <span className='font-medium text-zinc-700'>Due</span>
          </span>
          <span className='inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-2 py-1 font-medium text-zinc-700 shadow-xs transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900'>
            <time dateTime={valueToShow ?? undefined}>
              {valueToShow
                ? format(parseDueDate(valueToShow), 'MMM d, yyyy')
                : 'Set due date'}
            </time>
            <ChevronDownIcon
              aria-hidden='true'
              className='size-3.5 text-zinc-500'
            />
          </span>
        </span>
      </Modal.Trigger>
      <Modal.Content ariaLabel='Choose a due date'>
        {({ closeModal }) => (
          <div className='calendar-picker'>
            <div>
              <h2 className='text-base font-semibold text-zinc-900'>
                Due date
              </h2>
              <p className='mt-1 text-sm text-zinc-500'>
                Choose when this ticket should be completed.
              </p>
            </div>
            <Calendar minDate={new Date()} value={value} onChange={setValue} />
            <div className='mt-4 flex w-full justify-end gap-2 border-t border-zinc-100 pt-4'>
              <Button
                disabled={!hasChanged}
                variant='secondary'
                className='min-w-20'
                onClick={() =>
                  setValue(initialValue ? parseDueDate(initialValue) : null)
                }
              >
                Cancel
              </Button>
              <Button
                disabled={!hasChanged}
                className='min-w-20'
                onClick={() => updateHandler(closeModal)}
              >
                Save
              </Button>
            </div>
            {message.length > 0 && (
              <p
                role={success ? 'status' : 'alert'}
                className={`mt-3 text-sm ${
                  success ? 'text-green-600' : 'text-red-500'
                }`}
              >
                {message}
              </p>
            )}
          </div>
        )}
      </Modal.Content>
    </Modal>
  );
}
