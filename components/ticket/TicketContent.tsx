import Link from 'next/link';

interface TicketContentProps {
  title: string;
  description: string;
  id: string;
}

export default function TicketContent({
  title,
  description,
  id,
}: TicketContentProps) {
  return (
    <>
      <Link
        href={`/ticket/${id}`}
        className='text-base font-semibold leading-6 text-zinc-950 transition-colors group-hover:text-zinc-700 hover:underline sm:text-lg'
      >
        {title}
      </Link>
      <p className='mt-1.5 line-clamp-2 max-w-2xl text-sm leading-6 text-zinc-500'>
        {description}
      </p>
      <Link
        href={`/ticket/${id}`}
        aria-label={`Open ticket ${id}`}
        className='text-xs font-medium tabular-nums text-zinc-600 hover:underline focus-visible:rounded-sm'
      >
        Ticket #{String(id).padStart(2, '0')}
      </Link>
    </>
  );
}
