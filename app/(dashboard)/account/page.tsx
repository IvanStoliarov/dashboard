import AssignedTicketsCard from '@/components/account/AssignedTicketsCard';
import TicketsCount from '@/components/account/TicketsCount';
import Spinner from '@/components/Spinner';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default async function AccountPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) redirect('/login');

  return (
    <>
      <header className='border-b border-zinc-100 pb-6'>
        <p className='text-sm font-medium text-zinc-500'>Profile</p>
        <h1 className='mt-1 text-2xl font-semibold tracking-tight text-zinc-950'>
          My Account
        </h1>
      </header>

      <section className='mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm'>
        <div className='border-b border-zinc-200 bg-zinc-50 px-5 py-4 sm:px-6'>
          <h2 className='text-sm font-semibold text-zinc-950'>
            Your tickets statistics
          </h2>
          <div className='md:grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <AssignedTicketsCard>
              <AssignedTicketsCard.Title>
                Assigned tickets
              </AssignedTicketsCard.Title>
              <AssignedTicketsCard.Content>
                <Suspense fallback={<Spinner />}>
                  <TicketsCount />
                </Suspense>
              </AssignedTicketsCard.Content>
            </AssignedTicketsCard>

            <AssignedTicketsCard>
              <AssignedTicketsCard.Title>
                Status: &apos;TODO&apos;
              </AssignedTicketsCard.Title>
              <AssignedTicketsCard.Content>
                <Suspense fallback={<Spinner />}>
                  <TicketsCount status='todo' />
                </Suspense>
              </AssignedTicketsCard.Content>
            </AssignedTicketsCard>

            <AssignedTicketsCard>
              <AssignedTicketsCard.Title>
                Status: &apos;In Progress&apos;
              </AssignedTicketsCard.Title>
              <AssignedTicketsCard.Content>
                <Suspense fallback={<Spinner />}>
                  <TicketsCount status='in_progress' />
                </Suspense>
              </AssignedTicketsCard.Content>
            </AssignedTicketsCard>

            <AssignedTicketsCard>
              <AssignedTicketsCard.Title>
                Status: &apos;QA&apos;
              </AssignedTicketsCard.Title>
              <AssignedTicketsCard.Content>
                <Suspense fallback={<Spinner />}>
                  <TicketsCount status='qa' />
                </Suspense>
              </AssignedTicketsCard.Content>
            </AssignedTicketsCard>

            <AssignedTicketsCard>
              <AssignedTicketsCard.Title>
                Status: &apos;Done&apos;
              </AssignedTicketsCard.Title>
              <AssignedTicketsCard.Content>
                <Suspense fallback={<Spinner />}>
                  <TicketsCount status='done' />
                </Suspense>
              </AssignedTicketsCard.Content>
            </AssignedTicketsCard>
          </div>
        </div>
      </section>
    </>
  );
}
