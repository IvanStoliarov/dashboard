'use client';

import { Ticket } from '@/lib/types';
import { useActionState, useEffect, useState } from 'react';
import Button from './Button';
import { TicketContentFormState, updateTicketContent } from '@/lib/actions';

interface TicketContentFormProps {
  ticket: Ticket;
}

const initialState: TicketContentFormState = {
  success: false,
  message: '',
  errors: null,
};

export default function TicketContentForm({ ticket }: TicketContentFormProps) {
  const [formInstance, setFormInstance] = useState(0);

  return (
    <TicketContentFormFields
      key={formInstance}
      ticket={ticket}
      onReset={() => setFormInstance(instance => instance + 1)}
    />
  );
}

function TicketContentFormFields({
  ticket,
  onReset,
}: TicketContentFormProps & { onReset: () => void }) {
  const [title, setTitle] = useState(ticket.title);
  const [description, setDescription] = useState(ticket.description);

  const [state, formAction, isPending] = useActionState(
    updateTicketContent,
    initialState,
  );
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (!state.message) return;

    const showTimeout = window.setTimeout(() => setShowMessage(true), 0);
    const hideTimeout = state.success
      ? window.setTimeout(() => setShowMessage(false), 5000)
      : undefined;

    return () => {
      window.clearTimeout(showTimeout);
      if (hideTimeout) window.clearTimeout(hideTimeout);
    };
  }, [state]);

  function resetForm() {
    onReset();
  }

  return (
    <form action={formAction}>
      <input type='hidden' name='id' value={ticket.id} />
      <div>
        <label htmlFor='title' className='text-sm font-medium text-zinc-800'>
          Title
        </label>
        <input
          disabled={isPending}
          type='text'
          name='title'
          id='title'
          onChange={e => setTitle(e.target.value)}
          value={title}
          className='mt-2 rounded-lg border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100'
        />
        {state?.errors?.title && (
          <p className='text-red-500'>{state.errors.title}</p>
        )}
      </div>
      <div>
        <label
          htmlFor='description'
          className='text-sm font-medium text-zinc-800'
        >
          Description
        </label>
        <textarea
          disabled={isPending}
          name='description'
          id='description'
          rows={7}
          onChange={e => setDescription(e.target.value)}
          value={description}
          className='mt-2 resize-none rounded-lg border-zinc-200 px-3 py-2 text-sm leading-6 text-zinc-900 outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100'
        />
        {state?.errors?.description && (
          <p className='text-red-500'>{state.errors.description}</p>
        )}
      </div>
      {(ticket.title !== title || ticket.description !== description) && (
        <div className='flex items-center gap-2'>
          <Button
            disabled={isPending}
            type='button'
            onClick={resetForm}
            variant='secondary'
          >
            Cancel
          </Button>
          <Button disabled={isPending} type='submit'>
            Save
          </Button>
        </div>
      )}
      {showMessage && state.message && (
        <p
          role={state.success ? 'status' : 'alert'}
          className={state.success ? 'text-green-600' : 'text-red-500'}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
