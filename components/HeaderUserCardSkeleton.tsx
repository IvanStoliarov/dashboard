export default function HeaderUserCardSkeleton() {
  return (
    <div aria-hidden='true' className='ml-auto'>
      <div className='flex items-center gap-2 rounded-full border border-zinc-200 bg-white py-1.5 pl-1.5 pr-3 shadow-sm'>
        <span className='h-8 w-8 animate-pulse rounded-full bg-zinc-200' />
        <span className='h-3.5 w-20 animate-pulse rounded bg-zinc-100' />
        <span className='h-4 w-4 animate-pulse rounded bg-zinc-100' />
      </div>
    </div>
  );
}
