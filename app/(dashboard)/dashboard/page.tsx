import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import HeaderUserCart from '@/components/header-user-card';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (!claims) {
    redirect('/login');
  }

  return (
    <section>
      <Link href='/new-ticket'>New ticket</Link>
    </section>
  );
}
