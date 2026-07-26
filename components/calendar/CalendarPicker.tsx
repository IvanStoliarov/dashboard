'use client';

import { useState } from 'react';
import { Calendar } from 'react-calendar';
import { format, parseISO } from 'date-fns';
import Modal from '../Modal';
import { updateTicketDueTo } from '@/lib/actions';
import toast from 'react-hot-toast';
import { TicketData } from '@/lib/types';
import CalendarPickerTrigger from './CalendarPickerTrigger';
import CalendarPickerButtons from './CalendarPickerButtons';

interface CalendarPickerProps {
  ticketId?: string;
  initialValue: string | null;
  variant?: 'inline' | 'details';
  describedBy?: string;
  onUpdate?: ({
    ticketId,
    newDate,
  }: {
    ticketId: TicketData['id'];
    newDate: TicketData['due_to'];
  }) => void;
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CalendarPicker({
  ticketId,
  initialValue,
  variant = 'inline',
  describedBy,
  onUpdate,
}: CalendarPickerProps) {
  const [value, setValue] = useState<Value>(
    initialValue ? parseISO(initialValue) : null,
  );
  const [newValue, setNewValue] = useState<string | null>(null);

  const initialDate = initialValue
    ? format(parseISO(initialValue), 'yyyy-MM-dd')
    : null;
  const selectedDate =
    value instanceof Date ? format(value, 'yyyy-MM-dd') : null;
  const hasChanged = initialDate !== selectedDate;
  const valueToShow = newValue || initialDate;
  const triggerLabel = valueToShow
    ? `Change due date, currently ${format(parseISO(valueToShow), 'MMMM d, yyyy')}`
    : 'Set due date';

  function reset() {
    setValue(initialValue ? parseISO(initialValue) : null);
  }

  function onSuccessUpdate({
    ticketId,
    selectedDate,
    closeCallback,
  }: {
    ticketId: TicketData['id'];
    selectedDate: string | null;
    closeCallback: () => void;
  }) {
    toast.success('Due to date successfully updated');
    closeCallback();
    if (onUpdate) {
      onUpdate({ ticketId, newDate: selectedDate });
    }
  }

  async function updateHandler(closeCallback: () => void) {
    if (!ticketId) {
      setNewValue(selectedDate);
      closeCallback();
      return;
    }

    const { success: result, message } = await updateTicketDueTo(
      ticketId,
      selectedDate,
    );

    if (!result) {
      toast.error(message);
      return;
    }
    onSuccessUpdate({ ticketId, selectedDate, closeCallback });
  }

  return (
    <Modal onCloseCallback={reset}>
      <input type='hidden' name='due_to_date' value={valueToShow || ''} />
      <Modal.Trigger ariaLabel={triggerLabel} ariaDescribedBy={describedBy}>
        <CalendarPickerTrigger valueToShow={valueToShow} variant={variant} />
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
            <CalendarPickerButtons
              updateHandler={updateHandler}
              closeModal={closeModal}
              hasChanged={hasChanged}
              initialValue={initialValue}
              setValue={setValue}
            />
          </div>
        )}
      </Modal.Content>
    </Modal>
  );
}
