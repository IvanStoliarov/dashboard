'use client';
import Button from '@/components/Button';
import { createTicket, NewTicketFormState } from '@/lib/actions';
import { use, useActionState } from 'react';

interface NewTicketFormProps {
  usersPromise: Promise<
    | {
        email: string | null;
        id: string;
        username: string | null;
      }[]
    | []
  >;
}

const initialState: NewTicketFormState = {
  title: '',
  description: '',
  assignedTo: '',
  success: false,
  message: '',
  errors: null,
};

export default function NewTicketForm({ usersPromise }: NewTicketFormProps) {
  const [state, formAction, isPending] = useActionState(
    createTicket,
    initialState,
  );
  const users = use(usersPromise);

  return (
    <form action={formAction} className='mt-8 space-y-6'>
      <div>
        <label
          htmlFor='title'
          className='mb-2 block text-sm font-medium text-zinc-800'
        >
          Title
        </label>
        <input
          disabled={isPending}
          id='title'
          name='title'
          type='text'
          defaultValue={state.title}
          placeholder='Summarize the issue'
          aria-invalid={Boolean(state.errors?.title)}
          aria-describedby={state.errors?.title ? 'title-error' : undefined}
          className='h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10 disabled:cursor-not-allowed disabled:bg-zinc-50 disabled:opacity-70'
        />
        {state.errors?.title && (
          <div id='title-error' className='mt-2 space-y-1'>
            {state.errors.title.map((message, index) => (
              <p className='text-sm text-red-600' key={`${message}-${index}`}>
                {message}
              </p>
            ))}
          </div>
        )}
      </div>

      <div>
        <label
          htmlFor='description'
          className='mb-2 block text-sm font-medium text-zinc-800'
        >
          Description
        </label>
        <textarea
          disabled={isPending}
          name='description'
          id='description'
          rows={7}
          defaultValue={state.description}
          placeholder='Describe what happened, what you expected, and any useful context.'
          aria-invalid={Boolean(state.errors?.description)}
          aria-describedby={
            state.errors?.description ? 'description-error' : undefined
          }
          className='w-full resize-y rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm leading-6 text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10 disabled:cursor-not-allowed disabled:bg-zinc-50 disabled:opacity-70'
        />
        {state.errors?.description && (
          <div id='description-error' className='mt-2 space-y-1'>
            {state.errors.description.map((message, index) => (
              <p className='text-sm text-red-600' key={`${message}-${index}`}>
                {message}
              </p>
            ))}
          </div>
        )}
      </div>

      <div>
        <label
          htmlFor='assigned_to'
          className='mb-2 block text-sm font-medium text-zinc-800'
        >
          Assignee
        </label>
        <select
          disabled={isPending}
          key={state.assignedTo}
          name='assigned_to'
          id='assigned_to'
          defaultValue={state.assignedTo}
          aria-invalid={Boolean(state.errors?.assignedTo)}
          aria-describedby={
            state.errors?.assignedTo ? 'assigned-to-error' : undefined
          }
          className='h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-950 outline-none transition focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10 disabled:cursor-not-allowed disabled:bg-zinc-50 disabled:opacity-70'
        >
          <option value=''>Select a team member</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
        {state.errors?.assignedTo && (
          <div id='assigned-to-error' className='mt-2 space-y-1'>
            {state.errors.assignedTo.map((message, index) => (
              <p className='text-sm text-red-600' key={`${message}-${index}`}>
                {message}
              </p>
            ))}
          </div>
        )}
      </div>

      <div className='flex justify-end border-t border-zinc-100 pt-6'>
        <Button disabled={isPending} type='submit'>
          {isPending ? 'Creating ticket...' : 'Create ticket'}
        </Button>
      </div>

      {state.message && (
        <p
          role={state.success ? 'status' : 'alert'}
          className={`rounded-lg border px-3 py-2.5 text-sm ${
            state.success
              ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
              : 'border-red-200 bg-red-50 text-red-700'
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
