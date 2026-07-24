import { TicketData } from '@/lib/types';
import Link from 'next/link';

export default function SearchSuggestions({
  isPending,
  tickets,
}: {
  isPending: boolean;
  tickets: TicketData[];
}) {
  if (tickets.length === 0) return null;

  return (
    <div className='absolute left-0 right-0 top-full z-20 pt-2'>
      <div className='overflow-hidden rounded-xl border border-zinc-200 bg-white p-1.5 shadow-[0_16px_32px_-16px_rgba(24,24,27,0.35)]'>
        <ul
          className={`flex max-h-64 flex-col gap-0.5 overflow-y-auto transition-opacity ${isPending ? 'opacity-40' : 'opacity-100'}`}
        >
          {tickets.map(ticket => (
            <li key={ticket.id}>
              <Link
                href={`/ticket/${ticket.id}`}
                className='block truncate rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-blue-50 hover:text-blue-700 focus-visible:bg-blue-50 focus-visible:text-blue-700'
              >
                {ticket.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
