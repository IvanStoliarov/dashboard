import TicketCard from '@/components/TicketCard';

export default async function TicketPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <TicketCard id={id} />;
}
