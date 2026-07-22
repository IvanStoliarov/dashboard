export default function AssigneeSelectSkeleton() {
  return (
    <div
      aria-hidden='true'
      className='inline-flex flex-col items-start gap-2 sm:flex-row sm:items-center'
    >
      <span className='block h-4 w-28 animate-pulse rounded bg-zinc-100' />
      <span className='flex h-[38px] w-40 animate-pulse items-center gap-2 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5'>
        <span className='size-6 rounded-full border border-zinc-200 bg-zinc-100' />
        <span className='h-3 w-20 rounded bg-zinc-100' />
        <span className='ml-auto size-3.5 rounded bg-zinc-100' />
      </span>
    </div>
  );
}
