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
    <form action={formAction} aria-busy={isPending}>
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
          aria-invalid={Boolean(state.errors?.title)}
          aria-describedby={state.errors?.title ? 'ticket-title-error' : undefined}
          className='mt-2 rounded-lg border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-700 focus:ring-2 focus:ring-blue-200'
        />
        {state?.errors?.title && (
          <p id='ticket-title-error' role='alert' className='text-red-600'>{state.errors.title}</p>
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
          aria-invalid={Boolean(state.errors?.description)}
          aria-describedby={state.errors?.description ? 'ticket-description-error' : undefined}
          className='mt-2 resize-none rounded-lg border-zinc-300 px-3 py-2 text-sm leading-6 text-zinc-900 outline-none transition focus:border-zinc-700 focus:ring-2 focus:ring-blue-200'
        />
        {state?.errors?.description && (
          <p id='ticket-description-error' role='alert' className='text-red-600'>{state.errors.description}</p>
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
          className={state.success ? 'text-emerald-700' : 'text-red-600'}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
