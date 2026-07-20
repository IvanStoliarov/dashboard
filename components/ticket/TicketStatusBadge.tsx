export default function TicketStatusBadge() {
  return (
    <span
      title='Ticket status: Open'
      className='inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600'
    >
      <span className='size-1.5 rounded-full bg-emerald-500' />
      Open
    </span>
  );
}
