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

export async function getTicketByIdAPI(id: Ticket['id']) {
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
    .eq('id', id)
    .single();

  return { data, error };
}

export async function getTicketStatusesAPI() {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc('get_ticket_statuses');

  return { data, error };
}

export async function updateTicketAPI({
  id,
  title,
  description,
}: {
  id: Ticket['id'];
  title: Ticket['title'];
  description: Ticket['description'];
}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tickets')
    .update({ title, description })
    .eq('id', id)
    .select()
    .single();

  return { data, error };
}
