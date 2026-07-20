import Spinner from '@/components/Spinner';
import TicketCard from '@/components/TicketCard';
import React, { Suspense } from 'react';

export default async function TicketPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <Suspense fallback={<Spinner />}>
      <TicketCard id={id} />
    </Suspense>
  );
}
