import { format, isBefore, isToday, parseISO, startOfDay } from 'date-fns';
interface TimeProps {
  valueToShow: string | null;
}

export default function Time({ valueToShow }: TimeProps) {
  return (
    <time
      className={
        valueToShow && isBefore(parseISO(valueToShow), startOfDay(new Date()))
          ? 'text-red-700'
          : valueToShow && isToday(parseISO(valueToShow))
            ? 'text-amber-700'
            : ''
      }
      dateTime={valueToShow ?? undefined}
    >
      {valueToShow
        ? format(parseISO(valueToShow), 'MMM d, yyyy')
        : 'Set due date'}
    </time>
  );
}
