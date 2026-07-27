import { PlusIcon } from '@heroicons/react/24/outline';
import LinkAsButton from '@/components/LinkAsButton';
import TicketList from '@/components/TicketList';

export default function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsPromise = searchParams;

  return (
    <div>
      <section className='mb-8 flex flex-col justify-between gap-4 border-b border-zinc-100 pb-7 sm:flex-row sm:items-center'>
        <div>
          <h1 className='text-lg font-semibold tracking-tight text-zinc-950'>
            Team workspace
          </h1>
          <p className='mt-1 text-sm text-zinc-500'>
            Keep work moving and ownership clear.
          </p>
        </div>
        <div className='flex flex-col gap-2 lg:flex-row'>
          <LinkAsButton
            href='/new-ticket'
            className='gap-2 self-start -order-1 lg:order-1'
          >
            <PlusIcon aria-hidden='true' className='size-4' />
            New ticket
          </LinkAsButton>
        </div>
      </section>
      <TicketList searchParamsPromise={searchParamsPromise} />
    </div>
  );
}
