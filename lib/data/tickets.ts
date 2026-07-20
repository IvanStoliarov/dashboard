import 'server-only';
import { createClient } from '../supabase/server';
import { Profile, Ticket } from '../types';

export async function createTicketAPI({
  title,
  description,
  assignedTo,
}: {
  title: Ticket['title'];
  description: Ticket['description'];
  assignedTo: Profile['id'] | null;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .rpc('create_ticket_with_assignee', {
      p_title: title,
      p_description: description,
      ...(assignedTo ? { p_assigned_to: assignedTo } : {}),
    });

  return { data, error };
}
