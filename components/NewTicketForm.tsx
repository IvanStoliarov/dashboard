'use client';
import Button from '@/components/Button';
import {
  createTicket,
  fetchUsersByName,
  NewTicketFormState,
} from '@/lib/actions';
import { useActionState } from 'react';
import AssigneesSelect from './assigneesSelect/AssigneesSelect';
import CalendarPicker from './CalendarPicker';

const initialState: NewTicketFormState = {
  title: '',
  description: '',
  assignedTo: '',
  dueToDate: '',
  success: false,
  message: '',
  errors: null,
};

export default function NewTicketForm() {
  const [state, formAction, isPending] = useActionState(
    createTicket,
    initialState,
  );

  return (
    <form action={formAction} className='mt-8 space-y-6' aria-busy={isPending}>
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
          <div id='title-error' className='mt-2 space-y-1' role='alert'>
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
          <div id='description-error' className='mt-2 space-y-1' role='alert'>
            {state.errors.description.map((message, index) => (
              <p className='text-sm text-red-600' key={`${message}-${index}`}>
                {message}
              </p>
            ))}
          </div>
        )}
      </div>

      <AssigneesSelect
        assigneesList={[]}
        handleSearch={fetchUsersByName}
        ticketId=''
        asFormElement={true}
      />
      <div>
        <CalendarPicker
          initialValue={
            state.errors?.dueToDate ? null : state.dueToDate || null
          }
          ticketId=''
          describedBy={state.errors?.dueToDate ? 'due-date-error' : undefined}
        />
        {state.errors?.dueToDate && (
          <div id='due-date-error' className='mt-2 space-y-1' role='alert'>
            {state.errors.dueToDate.map((message, index) => (
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
