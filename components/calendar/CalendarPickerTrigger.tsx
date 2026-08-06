import { CalendarDaysIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import Time from './Time';

interface CalendarPickerTriggerProps {
  variant: 'details' | 'inline';
  valueToShow: string | null;
}

export default function CalendarPickerTrigger({
  variant,
  valueToShow,
}: CalendarPickerTriggerProps) {
  return (
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
        <Time valueToShow={valueToShow} />
        <ChevronDownIcon
          aria-hidden='true'
          className='size-3.5 text-zinc-500'
        />
      </span>
    </span>
  );
}
