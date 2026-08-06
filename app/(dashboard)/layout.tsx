import { ReactNode } from 'react';
import Header from './Header';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (!claims) {
    redirect('/login');
  }
  return (
    <>
      <div className='min-h-screen bg-zinc-50 px-4 py-8 sm:px-6'>
        <div className='mx-auto max-w-450'>
          <Header />
          <main
            id='main-content'
            className='mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8'
          >
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
