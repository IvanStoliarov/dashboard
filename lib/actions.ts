'use server';

import z from 'zod';
import {
  createTicketAPI,
  getTicketByIdAPI,
  getTicketStatusesAPI,
  getTicketsAPI,
  updateTicketAPI,
} from './data/tickets';
import type { Ticket } from './types';
import { refresh } from 'next/cache';

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

export async function getTicketById(id: Ticket['id']) {
  const { data, error } = await getTicketByIdAPI(id);
  if (error || !data) return null;
  return data;
}

export async function getTicketStatuses() {
  const { data, error } = await getTicketStatusesAPI();
  if (error || !data) return [];
  return data;
}

export interface TicketContentFormState {
  success: boolean
  message: string
  errors?: { [key: string]: string[] } | null;
}

const updateTicketSchema = z.object({
  id: z.uuid('Invalid ticket ID'),
  title: z.string('Not a string').min(5, 'Minimum 5 symbols'),
  description: z.string('Not a string').min(5, 'Minimum 5 symbols'),
});

export async function updateTicketContent(prevState: TicketContentFormState, formData: FormData) {

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
      errors
    }
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
  }

}
