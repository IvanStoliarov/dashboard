import React, { SetStateAction } from 'react';
import Button from '../Button';
import { parseISO } from 'date-fns';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CalendarPickerButtonsProps {
  hasChanged: boolean;
  initialValue: string | null;
  setValue: (value: SetStateAction<Value>) => void;
  closeModal: () => void;
  updateHandler: (closeCallback: () => void) => Promise<void>;
}

export default function CalendarPickerButtons({
  closeModal,
  hasChanged,
  initialValue,
  setValue,
  updateHandler,
}: CalendarPickerButtonsProps) {
  return (
    <div className='mt-4 flex w-full justify-end gap-2 border-t border-zinc-100 pt-4'>
      <Button
        disabled={!hasChanged}
        variant='secondary'
        className='min-w-20'
        onClick={() => setValue(initialValue ? parseISO(initialValue) : null)}
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
  );
}
