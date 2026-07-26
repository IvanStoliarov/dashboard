import { getTickets } from "@/lib/actions";
import { createClient } from "@/lib/supabase/server";
import type { TicketData } from "@/lib/types";
import Link from "next/link";

export default async function TicketsCount({
  status = undefined,
}: {
  status?: TicketData['status'];
}) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  const userId = claims?.sub;
  if (!userId) return null;
  const assignedTickets = await getTickets({ filterbyuser: userId, status });
  const ticketCount = assignedTickets.length;
  const ticketLabel = ticketCount === 1 ? "ticket" : "tickets";
  const params = new URLSearchParams();
  params.set("filterbyuser", userId);
  if (status) {
    params.set("status", status);
  }

  return (
    <div>
      <Link
        href={`/dashboard?${params}`}
        aria-label={`View ${ticketCount} ${ticketLabel} assigned to you`}
        className="group/count inline-flex items-baseline gap-2 rounded-md text-zinc-950 transition-colors hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        <span className="text-3xl font-semibold tracking-tight tabular-nums">
          {ticketCount}
        </span>
        <span className="text-sm font-medium text-zinc-500 transition-colors group-hover/count:text-blue-600">
          {ticketLabel}
        </span>
      </Link>
      <p className="mt-1 text-sm text-zinc-500">assigned to you</p>
    </div>
  );
}
