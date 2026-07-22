'use server';

import z from 'zod';
import {
  createTicketAPI,
  getTicketByIdAPI,
  getTicketStatusesAPI,
  getTicketsAPI,
  updateTicketAPI,
  updateTicketAssigneeListAPI,
  updateTicketDueToAPI,
  updateTicketStatusAPI,
} from './data/tickets';
import {
  getAllUsersAPI,
  getUserDataAPI,
  getUsersByNameAPI,
} from './data/profiles';
import type { Ticket, TicketData } from './types';
import { refresh } from 'next/cache';
import { cache } from 'react';
import { redirect } from 'next/navigation';

export interface NewTicketFormState {
  success: boolean;
  message: string;
  errors?: { [key: string]: string[] } | null;
  title: string;
  description: string;
  assignedTo: string;
  dueToDate: string;
}

const newTicketSchema = z.object({
  title: z.string('Not a string').min(5, 'Minimum 5 symbols'),
  description: z.string('Not a string').min(5, 'Minimum 5 symbols'),
  assignedTo: z.optional(z.string()),
  dueToDate: z.union([
    z.literal(''),
    z.iso.date('Invalid due date'),
  ]),
});

export async function createTicket(
  prevState: NewTicketFormState,
  formData: FormData,
) {
  const assignedTo = formData
    .getAll('assigned_to')
    .filter(
      (value): value is string => typeof value === 'string' && value !== '',
    );
  const values = {
    title: String(formData.get('title')) || '',
    description: String(formData.get('description')) || '',
    assignedTo: assignedTo.join(','),
    dueToDate: String(formData.get('due_to_date')) || ''
  };

  const result = newTicketSchema.safeParse(values);

  if (!result.success) {
    const errors = z.flattenError(result.error).fieldErrors;
    return {
      ...values,
      success: false,
      message: '',
      errors,
    };
  }
  const { title, description, dueToDate } = values;

  const { ticketId, error: ticketError } = await createTicketAPI({
    title,
    description,
    assignedTo,
    dueTo: dueToDate || null,
  });
  if (ticketError || !ticketId)
    return {
      ...values,
      success: false,
      message: "Couldn't create ticket",
      errors: null,
    };

  refresh();
  redirect(`/ticket/${ticketId}`);
}

type TicketSortBy = 'due-to' | 'date';
type TicketSortDirection = 'asc' | 'desc';

const DEFAULT_TICKET_SORT_BY: TicketSortBy = 'due-to';
const DEFAULT_TICKET_SORT_DIRECTION: TicketSortDirection = 'asc';

function getTicketSortBy(sortby?: string): TicketSortBy {
  return sortby === 'date' ? sortby : DEFAULT_TICKET_SORT_BY;
}

function getTicketSortDirection(sortdir?: string): TicketSortDirection {
  return sortdir === 'desc' ? sortdir : DEFAULT_TICKET_SORT_DIRECTION;
}

export const getTickets = cache(
  async ({ sortby, sortdir }: { sortby?: string; sortdir?: string } = {}) => {
    const { data, error } = await getTicketsAPI();
    if (error || !data) return [];

    const resolvedSortBy = getTicketSortBy(sortby);
    const resolvedSortDirection = getTicketSortDirection(sortdir);

    if (resolvedSortBy === 'date') {
      return resolvedSortDirection === 'desc' ? data : [...data].reverse();
    }

    const direction = resolvedSortDirection === 'asc' ? 1 : -1;

    return [...data].sort((ticketA, ticketB) => {
      if (!ticketA.due_to && !ticketB.due_to) return 0;
      if (!ticketA.due_to) return 1;
      if (!ticketB.due_to) return -1;
      return ticketA.due_to.localeCompare(ticketB.due_to) * direction;
    });
  },
);

export async function getTicketById(id: Ticket['id']) {
  const { data, error } = await getTicketByIdAPI(id);
  if (error || !data) return null;
  return data;
}

export const getTicketStatuses = cache(async () => {
  const { data, error } = await getTicketStatusesAPI();
  if (error || !data) return [];
  return data;
});

export async function fetchProfileDataById(id: string) {
  return getUserDataAPI(id);
}

export async function fetchAllUsers() {
  return getAllUsersAPI();
}

export async function fetchUsersByName(name: string) {
  return getUsersByNameAPI(name);
}

export interface TicketContentFormState {
  success: boolean;
  message: string;
  errors?: { [key: string]: string[] } | null;
}

const updateTicketSchema = z.object({
  id: z.uuid('Invalid ticket ID'),
  title: z.string('Not a string').min(5, 'Minimum 5 symbols'),
  description: z.string('Not a string').min(5, 'Minimum 5 symbols'),
});

export async function updateTicketContent(
  prevState: TicketContentFormState,
  formData: FormData,
) {
  const values = {
    id: String(formData.get('id')) || '',
    title: String(formData.get('title')) || '',
    description: String(formData.get('description')) || '',
  };

  const result = updateTicketSchema.safeParse(values);
  if (result.error) {
    const errors = z.flattenError(result.error).fieldErrors;
    return {
      success: false,
      message: '',
      errors,
    };
  }
  const { data, error } = await updateTicketAPI(values);

  if (error || !data) {
    return {
      success: false,
      message: "Couldn't update ticket",
      errors: null,
    };
  }

  refresh();

  return {
    success: true,
    message: 'Ticket successfully updated',
    errors: null,
  };
}

export async function updateTicketAssigneeList(
  ticketId: Ticket['id'],
  assigneeList: TicketData['ticket_assignees'],
) {
  const { data, error } = await updateTicketAssigneeListAPI(
    ticketId,
    assigneeList,
  );
  refresh();
  return { data, error };
}
const updateTicketStatusSchema = z.object({
  id: z.uuid('Invalid ticket ID'),
  status: z.enum(['todo', 'in_progress', 'qa', 'done']),
});

export async function updateTicketStatus(
  id: Ticket['id'],
  status: Ticket['status'],
) {
  const result = updateTicketStatusSchema.safeParse({ id, status });

  if (!result.success) {
    return {
      success: false,
      message: 'Invalid ticket status update',
    };
  }

  const { data, error } = await updateTicketStatusAPI(result.data);

  if (error || !data) {
    return {
      success: false,
      message: "Couldn't update ticket status",
    };
  }

  refresh();

  return {
    success: true,
    message: 'Ticket status successfully updated',
  };
}

const updateTicketDueToSchema = z.object({
  id: z.uuid('Invalid ticket ID'),
  dueTo: z.union([z.iso.date('Invalid due date'), z.null()]),
});

export async function updateTicketDueTo(
  id: Ticket['id'],
  dueTo: Ticket['due_to'],
) {
  const result = updateTicketDueToSchema.safeParse({ id, dueTo });

  if (!result.success) {
    return {
      success: false,
      message: 'Invalid ticket due date update',
    };
  }

  const { data, error } = await updateTicketDueToAPI(result.data);

  if (error || !data) {
    return {
      success: false,
      message: "Couldn't update ticket due date",
    };
  }

  refresh();

  return {
    success: true,
    message: 'Ticket due date successfully updated',
  };
}
