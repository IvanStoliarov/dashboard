'use server';

import { revalidatePath } from 'next/cache';
import z from 'zod';
import {
  createTicketAPI,
  getTicketsAPI,
  updateTicketAssigneeAPI,
} from './data/tickets';

export interface NewTicketFormState {
  success: boolean;
  message: string;
  errors?: { [key: string]: string[] } | null;
  title: string;
  description: string;
  assignedTo: string;
}

const newTicketSchema = z.object({
  title: z.string('Not a string').min(5, 'Minimum 5 symbols'),
  description: z.string('Not a string').min(5, 'Minimum 5 symbols'),
  assignedTo: z.optional(z.string()),
});

export async function createTicket(
  prevState: NewTicketFormState,
  formData: FormData,
) {
  const values = {
    title: String(formData.get('title')) || '',
    description: String(formData.get('description')) || '',
    assignedTo: String(formData.get('assigned_to')) || '',
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
  const title = String(formData.get('title'));
  const description = String(formData.get('description'));
  const assignedTo = String(formData.get('assigned_to'));

  const { data: ticket, error: ticketError } = await createTicketAPI({
    title,
    description,
    assignedTo: assignedTo || null,
  });
  if (ticketError || !ticket)
    return {
      ...values,
      success: false,
      message: "Couldn't create ticket",
      errors: null,
    };

  return {
    title: '',
    description: '',
    assignedTo: '',
    success: true,
    message: 'Ticket successfully created',
    errors: null,
  };
}

export async function getTickets() {
  const { data, error } = await getTicketsAPI();
  if (error || !data) return [];
  return data;
}

const ticketAssigneeSchema = z.object({
  ticketId: z.uuid(),
  assignedTo: z.array(z.uuid()).transform(ids => [...new Set(ids)]),
});

export async function updateTicketAssignee(formData: FormData) {
  const result = ticketAssigneeSchema.safeParse({
    ticketId: String(formData.get('ticket_id')),
    assignedTo: formData
      .getAll('assigned_to')
      .map(id => String(id))
      .filter(Boolean),
  });

  if (!result.success) {
    return;
  }

  const { error } = await updateTicketAssigneeAPI({
    ticketId: result.data.ticketId,
    assignedTo: result.data.assignedTo,
  });

  if (error) {
    throw new Error('Could not update ticket assignee');
  }

  revalidatePath('/dashboard');
}
