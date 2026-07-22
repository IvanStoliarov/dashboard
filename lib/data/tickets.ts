import 'server-only';
import { createClient } from '../supabase/server';
import { Profile, Ticket, TicketData } from '../types';

export async function createTicketAPI({
  title,
  description,
  assignedTo,
  dueTo,
}: {
  title: Ticket['title'];
  description: Ticket['description'];
  assignedTo: Profile['id'][];
  dueTo: Ticket['due_to'];
}) {
  const supabase = await createClient();

  const { data: ticketId, error } = await supabase.rpc(
    'create_ticket_with_assignee',
    {
      p_title: title,
      p_description: description,
      p_assigned_to: assignedTo,
      p_due_to: dueTo,
    },
  );

  if (error) {
    console.log(error)
  }

  return { ticketId, error };
}

export async function getTicketsAPI(assigneeIds?: Profile['id'][]) {
  const supabase = await createClient();
  let ticketIds: Ticket['id'][] | undefined;

  if (assigneeIds !== undefined) {
    if (assigneeIds.length === 0) return { data: [], error: null };

    const { data: assignments, error: assignmentsError } = await supabase
      .from('ticket_assignees')
      .select('ticket_id')
      .in('profile_id', assigneeIds);

    if (assignmentsError) return { data: null, error: assignmentsError };

    ticketIds = [...new Set(assignments.map(({ ticket_id }) => ticket_id))];
    if (ticketIds.length === 0) return { data: [], error: null };
  }

  let query = supabase
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
    );

  if (ticketIds) query = query.in('id', ticketIds);

  const { data, error } = await query.order('created_at', { ascending: false });

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
