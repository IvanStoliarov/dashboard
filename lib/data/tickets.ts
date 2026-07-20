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

  const { data, error } = await supabase.rpc('create_ticket_with_assignee', {
    p_title: title,
    p_description: description,
    ...(assignedTo ? { p_assigned_to: assignedTo } : {}),
  });

  return { data, error };
}

export async function getTicketsAPI() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tickets')
    .select(
      `
      *,
      ticket_assignees (
        profile_id,
        profile:profiles (
          id,
          username
        )
      )
    `,
    )
    .order('created_at', { ascending: false });

  return { data, error };
}

export async function updateTicketAssigneeAPI({
  ticketId,
  assignedTo,
}: {
  ticketId: Ticket['id'];
  assignedTo: Profile['id'][];
}) {
  const supabase = await createClient();
  const { error } = await supabase.rpc('update_ticket_assignee', {
    p_ticket_id: ticketId,
    p_profile_ids: assignedTo,
  });

  return { error };
}
