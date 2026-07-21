import 'server-only';
import { createClient } from '../supabase/server';
import { Profile, Ticket, TicketData } from '../types';

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

export async function updateTicketStatusAPI({
  id,
  status,
}: {
  id: Ticket['id'];
  status: Ticket['status'];
}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tickets')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  return { data, error };
}

export async function updateTicketDueToAPI({
  id,
  dueTo,
}: {
  id: Ticket['id'];
  dueTo: Ticket['due_to'];
}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tickets')
    .update({ due_to: dueTo })
    .eq('id', id)
    .select()
    .single();

  return { data, error };
}

export async function updateTicketAssigneeListAPI(
  ticketId: Ticket['id'],
  assigneeList: TicketData['ticket_assignees'],
) {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc('update_ticket_assignee', {
    p_ticket_id: ticketId,
    p_profile_ids: assigneeList.map(({ profile_id }) => profile_id),
  });

  return { data, error };
}
