import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function Home() {
  const client = await createClient();
  const claims = await client.auth.getClaims();
  const isAuthenticated = claims.data?.claims.sub;
  return (
    <main
      id='main-content'
      className='min-h-screen bg-zinc-50 px-4 py-6 sm:px-6'
    >
      <div className='mx-auto max-w-6xl'>
        <nav
          aria-label='Primary navigation'
          className='flex items-center justify-between'
        >
          <span className='text-sm font-semibold tracking-tight text-zinc-950'>
            Dashboard
          </span>
          <div className='flex items-center gap-2'>
            {!isAuthenticated && (
              <>
                {' '}
                <Link
                  href='/login'
                  className='rounded-lg px-3.5 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-200/70'
                >
                  Sign in
                </Link>
                <Link
                  href='/signup'
                  className='rounded-lg bg-zinc-950 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-zinc-800'
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </nav>

        <section className='flex min-h-[calc(100vh-5rem)] items-center py-20'>
          <div className='max-w-3xl'>
            <p className='text-sm font-medium text-zinc-500'>
              Server-authenticated workspace
            </p>
            <h1 className='mt-4 text-5xl font-semibold tracking-[-0.04em] text-zinc-950 sm:text-7xl'>
              A secure foundation for your dashboard.
            </h1>
            <p className='mt-6 max-w-2xl text-lg leading-8 text-zinc-600'>
              Email and password authentication powered by Supabase, with
              sessions validated and refreshed on the server.
            </p>
            <div className='mt-9 flex flex-wrap gap-3'>
              {!isAuthenticated && (
                <Link
                  href='/signup'
                  className='rounded-lg bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800'
                >
                  Create account
                </Link>
              )}
              <Link
                href='/dashboard'
                className='rounded-lg border border-zinc-300 bg-white px-5 py-3 text-sm font-medium text-zinc-800 transition hover:border-zinc-400'
              >
                Open dashboard
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
