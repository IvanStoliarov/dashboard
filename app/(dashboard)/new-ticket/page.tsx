import React from 'react';
import NewTicketForm from '@/components/NewTicketForm';
import { fetchAllUsers } from '@/lib/actions';

export default async function NewTicket() {
  const users = await fetchAllUsers();
  return <NewTicketForm users={users} />;
}
