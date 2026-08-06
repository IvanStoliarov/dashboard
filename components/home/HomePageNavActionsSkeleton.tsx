export default function HomePageNavActionsSkeleton() {
  return (
    <div aria-hidden='true' className='flex items-center gap-2'>
      <span className='h-9 w-16 animate-pulse rounded-lg bg-zinc-100' />
      <span className='h-9 w-24 animate-pulse rounded-lg bg-zinc-200' />
    </div>
  );
}
