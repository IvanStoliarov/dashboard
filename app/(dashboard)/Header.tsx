import HeaderUserCard from '@/components/HeaderUserCard';
import HeaderUserCardSkeleton from '@/components/HeaderUserCardSkeleton';
import Nav from '../../components/dashboard/Nav';
import { Suspense } from 'react';

export default function Header() {
  return (
    <header className='flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-5 py-4 shadow-sm'>
      <Nav />
      <Suspense fallback={<HeaderUserCardSkeleton />}>
        <HeaderUserCard />
      </Suspense>
    </header>
  );
}
