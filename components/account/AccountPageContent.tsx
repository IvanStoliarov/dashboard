import React, { Suspense } from 'react';
import AssignedTicketsCard from './AssignedTicketsCard';
import TicketsCount from './TicketsCount';
import TicketsCountSkeleton from './TicketsCountSkeleton';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getTickets } from '@/lib/actions';

export default async function AccountPageContent() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) redirect('/login');
  const userId = data.user.id;
  const assignedTicketsPromise = getTickets({
    filterbyuser: userId,
  });
  return (
    <div className='border-b border-zinc-200 bg-zinc-50 px-5 py-4 sm:px-6'>
      <h2 className='text-sm font-semibold text-zinc-950'>
        Your tickets statistics
      </h2>
      <div className='mt-4'>
        <p className='text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500'>
          Deadlines
        </p>
        <div className='mt-3 grid gap-4 sm:grid-cols-2'>
          <AssignedTicketsCard variant='danger'>
            <AssignedTicketsCard.Title>
              Outdated tickets
            </AssignedTicketsCard.Title>
            <AssignedTicketsCard.Content>
              <Suspense
                fallback={<TicketsCountSkeleton variant='danger' />}
              >
                <TicketsCount
                  assignedTicketsPromise={assignedTicketsPromise}
                  userId={userId}
                  deadline='outdated'
                />
              </Suspense>
            </AssignedTicketsCard.Content>
          </AssignedTicketsCard>

          <AssignedTicketsCard variant='warning'>
            <AssignedTicketsCard.Title>Due today</AssignedTicketsCard.Title>
            <AssignedTicketsCard.Content>
              <Suspense
                fallback={<TicketsCountSkeleton variant='warning' />}
              >
                <TicketsCount
                  assignedTicketsPromise={assignedTicketsPromise}
                  userId={userId}
                  deadline='today'
                />
              </Suspense>
            </AssignedTicketsCard.Content>
          </AssignedTicketsCard>
        </div>
      </div>

      <div className='mt-6 border-t border-zinc-200 pt-5'>
        <p className='text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500'>
          Overview
        </p>
        <div className='mt-3 grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <AssignedTicketsCard>
            <AssignedTicketsCard.Title>
              Assigned tickets
            </AssignedTicketsCard.Title>
            <AssignedTicketsCard.Content>
              <Suspense fallback={<TicketsCountSkeleton />}>
                <TicketsCount
                  assignedTicketsPromise={assignedTicketsPromise}
                  userId={userId}
                />
              </Suspense>
            </AssignedTicketsCard.Content>
          </AssignedTicketsCard>

          <AssignedTicketsCard>
            <AssignedTicketsCard.Title>
              Status: &apos;TODO&apos;
            </AssignedTicketsCard.Title>
            <AssignedTicketsCard.Content>
              <Suspense fallback={<TicketsCountSkeleton />}>
                <TicketsCount
                  assignedTicketsPromise={assignedTicketsPromise}
                  userId={userId}
                  status='todo'
                />
              </Suspense>
            </AssignedTicketsCard.Content>
          </AssignedTicketsCard>

          <AssignedTicketsCard>
            <AssignedTicketsCard.Title>
              Status: &apos;In Progress&apos;
            </AssignedTicketsCard.Title>
            <AssignedTicketsCard.Content>
              <Suspense fallback={<TicketsCountSkeleton />}>
                <TicketsCount
                  assignedTicketsPromise={assignedTicketsPromise}
                  userId={userId}
                  status='in_progress'
                />
              </Suspense>
            </AssignedTicketsCard.Content>
          </AssignedTicketsCard>

          <AssignedTicketsCard>
            <AssignedTicketsCard.Title>
              Status: &apos;QA&apos;
            </AssignedTicketsCard.Title>
            <AssignedTicketsCard.Content>
              <Suspense fallback={<TicketsCountSkeleton />}>
                <TicketsCount
                  assignedTicketsPromise={assignedTicketsPromise}
                  userId={userId}
                  status='qa'
                />
              </Suspense>
            </AssignedTicketsCard.Content>
          </AssignedTicketsCard>

          <AssignedTicketsCard>
            <AssignedTicketsCard.Title>
              Status: &apos;Done&apos;
            </AssignedTicketsCard.Title>
            <AssignedTicketsCard.Content>
              <Suspense fallback={<TicketsCountSkeleton />}>
                <TicketsCount
                  assignedTicketsPromise={assignedTicketsPromise}
                  userId={userId}
                  status='done'
                />
              </Suspense>
            </AssignedTicketsCard.Content>
          </AssignedTicketsCard>
        </div>
      </div>
    </div>
  );
}
