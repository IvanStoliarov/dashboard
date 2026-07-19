import HeaderUserCart from '@/components/header-user-card';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Nav from './Nav';

export default async function Header() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (!claims) {
    redirect('/login');
  }
  return (
    <header className='flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-5 py-4 shadow-sm'>
      <Nav />
      <HeaderUserCart userId={claims.sub} />
    </header>
  );
}
