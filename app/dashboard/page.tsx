import { redirect } from 'next/navigation';
import { logout } from '@/app/auth/actions';
import { createClient } from '@/lib/supabase/server';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (!claims) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('email, username')
    .eq('id', claims.sub)
    .maybeSingle();
  const email = profile?.email ?? 'Authenticated user';
  const username = profile?.username ?? 'Authenticated user';

  return (
    <main className='min-h-screen bg-zinc-50 px-4 py-8 sm:px-6'>
      <div className='mx-auto max-w-5xl'>
        <header className='flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-5 py-4 shadow-sm'>
          <div>
            <p className='text-sm font-semibold text-zinc-950'>{username}</p>
            <p className='mt-0.5 text-sm text-zinc-500'>{email}</p>
          </div>
          <form action={logout}>
            <button
              type='submit'
              className='rounded-lg border border-zinc-300 px-3.5 py-2 text-sm font-medium text-zinc-800 transition hover:border-zinc-400 hover:bg-zinc-50'
            >
              Sign out
            </button>
          </form>
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
