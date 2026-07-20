import React from 'react';
import NewTicketForm from '../NewTicketForm';
import { getAllUsers } from '@/lib/data/profiles';

export default async function NewTicket() {
  const users = await getAllUsers();
  return <NewTicketForm users={users} />;
}
