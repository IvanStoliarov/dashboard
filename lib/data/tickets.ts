import 'server-only';
import type { PostgrestError } from '@supabase/supabase-js';
import { createClient } from '../supabase/server';
import {
  Profile,
  Ticket,
  TicketData,
  TicketDeadlineFilter,
} from '../types';

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

interface TicketQueryOptions {
  assigneeIds?: Profile['id'][];
  searchQuery?: string;
  status?: TicketData['status'];
  deadline?: TicketDeadlineFilter;
  limit?: number;
}

interface TicketQueryResult {
  data: TicketData[] | null;
  error: PostgrestError | null;
}

const APPLICATION_TIME_ZONE =
  process.env.APP_TIME_ZONE ?? 'Europe/Warsaw';

function getCurrentCalendarDate() {
  const parts = new Intl.DateTimeFormat('en', {
    timeZone: APPLICATION_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const dateParts = Object.fromEntries(
    parts.map(({ type, value }) => [type, value]),
  );

  return `${dateParts.year}-${dateParts.month}-${dateParts.day}`;
}

function getIlikeFilterValue(value: string) {
  const escapedPattern = value.replace(/[\\%_]/g, '\\$&');
  const escapedFilterValue = `%${escapedPattern}%`
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"');

  return `"${escapedFilterValue}"`;
}

async function queryTickets({
  assigneeIds,
  searchQuery,
  status,
  deadline,
  limit,
}: TicketQueryOptions = {}): Promise<TicketQueryResult> {
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

  if (status !== undefined) query = query.eq('status', status);

  if (deadline !== undefined) {
    const today = getCurrentCalendarDate();
    query =
      deadline === 'outdated'
        ? query.lt('due_to', today)
        : query.eq('due_to', today);
    query = query.neq('status', 'done');
  }

  if (searchQuery !== undefined) {
    const filterValue = getIlikeFilterValue(searchQuery);
    query = query.or(
      `title.ilike.${filterValue},description.ilike.${filterValue}`,
    );
  }

  query = query.order('created_at', { ascending: false });

  if (limit !== undefined) query = query.limit(limit);

  const { data, error } = await query;

  return { data, error };
}

export async function getTicketsAPI(
  assigneeIds?: Profile['id'][],
  searchQuery?: string,
  status?: TicketData['status'],
  deadline?: TicketDeadlineFilter,
) {
  return queryTickets({ assigneeIds, searchQuery, status, deadline });
}

export async function searchTicketsAPI({
  searchQuery,
  assigneeIds,
  limit,
}: {
  searchQuery: string;
  assigneeIds?: Profile['id'][];
  limit?: number;
}) {
  const query = searchQuery.trim();

  if (!query) return { data: [], error: null };

  return queryTickets({ assigneeIds, searchQuery: query, limit });
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
  const { data, error } = await supabase.rpc('update_ticket_content', {
    p_ticket_id: id,
    p_title: title,
    p_description: description,
  });

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
