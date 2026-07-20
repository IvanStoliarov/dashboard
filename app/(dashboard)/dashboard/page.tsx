import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import LinkAsButton from '@/components/LinkAsButton';
import TicketList from './TicketList';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (!claims) {
    redirect('/login');
  }

  return (
    <>
    <section>
      <LinkAsButton href='/new-ticket'>New ticket</LinkAsButton>
    </section>
    <TicketList />
    </>
  );
}
