import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import HeaderUserCart from '@/components/header-user-card';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (!claims) {
    redirect('/login');
  }

  return (
    <main className='min-h-screen bg-zinc-50 px-4 py-8 sm:px-6'>
      <div className='mx-auto max-w-5xl'>
        <header className='flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-5 py-4 shadow-sm'>
          <HeaderUserCart userId={claims.sub} />
        </header>

        <section className='mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8'>
          <p className='text-sm font-medium text-emerald-700'>
            Authentication active
          </p>
          <h1 className='mt-3 text-3xl font-semibold tracking-tight text-zinc-950'>
            You are signed in.
          </h1>
          <p className='mt-3 max-w-xl text-base leading-7 text-zinc-600'>
            This page is rendered on the server and protected by your Supabase
            session.
          </p>
        </section>
      </div>
    </main>
  );
}
