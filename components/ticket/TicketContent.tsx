interface TicketContentProps {
  title: string;
  description: string;
}

export default function TicketContent({
  title,
  description,
}: TicketContentProps) {
  return (
    <>
      <h2 className='text-base font-semibold leading-6 text-zinc-950 transition-colors group-hover:text-zinc-700 sm:text-lg'>
        {title}
      </h2>
      <p className='mt-1.5 line-clamp-2 max-w-2xl text-sm leading-6 text-zinc-500'>
        {description}
      </p>
    </>
  );
}
