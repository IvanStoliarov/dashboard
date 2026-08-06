import AccountPageContent from '@/components/account/AccountPageContent';
import AccountPageContentSkeleton from '@/components/account/AccountPageContentSkeleton';
import { Suspense } from 'react';

export default async function AccountPage() {
  return (
    <>
      <header className='border-b border-zinc-100 pb-6'>
        <p className='text-sm font-medium text-zinc-500'>Profile</p>
        <h1 className='mt-1 text-2xl font-semibold tracking-tight text-zinc-950'>
          My Account
        </h1>
      </header>

      <section className='mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm'>
        <Suspense fallback={<AccountPageContentSkeleton />}>
          <AccountPageContent />
        </Suspense>
      </section>
    </>
  );
}
