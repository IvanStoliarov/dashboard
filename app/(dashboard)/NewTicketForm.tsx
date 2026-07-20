'use client';
import Button from '@/components/Button';
import { createTicket, NewTicketFormState } from '@/lib/actions';
import { Profile } from '@/lib/types';
import { useActionState } from 'react';

interface NewTicketFormProps {
  users: Profile[];
}

const initialState: NewTicketFormState = {
  title: '',
  description: '',
  assignedTo: '',
  success: false,
  message: '',
  errors: null,
};

export default function NewTicketForm({ users }: NewTicketFormProps) {
  const [state, formAction, isPending] = useActionState(
    createTicket,
    initialState,
  );

  return (
    <form
      action={formAction}
      className='grid md:grid-cols-[auto_1fr] gap-x-4 gap-y-2'
    >
      <label htmlFor='title'>Title</label>
      <div>
        <input id='title' name='title' type='text' defaultValue={state.title} />
        {state?.errors?.title &&
          state.errors.title.map(message => (
            <p className='text-red-500' key={message}>
              {message}
            </p>
          ))}
      </div>
      <label htmlFor='description'>Description</label>
      <div>
        <textarea
          className='resize-none'
          name='description'
          id='description'
          defaultValue={state.description}
        />
        {state?.errors?.description &&
          state.errors.description.map(message => (
            <p className='text-red-500' key={message}>
              {message}
            </p>
          ))}
      </div>
      <label htmlFor='assigned_to'>Assignee</label>
      <div>
        <select
          key={state.assignedTo}
          name='assigned_to'
          id='assigned_to'
          defaultValue={state.assignedTo}
        >
          <option value=''>Select User</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
        {state?.errors?.assignedTo &&
          state.errors.assignedTo.map(message => (
            <p className='text-red-500' key={message}>
              {message}
            </p>
          ))}
      </div>
      <Button disabled={isPending} type='submit'>
        Create Ticket
      </Button>
      {state.message && (
        <p
          className={`col-start-1 -col-end-1 ${state.success ? 'text-green-500' : 'text-red-500'}`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
