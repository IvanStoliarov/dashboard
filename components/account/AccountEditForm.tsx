'use client';
import { AccountEditFormState, updateUser } from '@/lib/actions';
import { useActionState, useEffect } from 'react';
import FormField from './FormField';
import Button from '../Button';
import toast from 'react-hot-toast';

const initialState: AccountEditFormState = {
  success: false,
  message: '',
  errors: {},
};

export default function AccountEditForm({ userName }: { userName: string }) {
  const [state, fromAction, isPending] = useActionState(
    updateUser,
    initialState,
  );

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={fromAction} className='space-y-6' aria-busy={isPending}>
      <FormField
        errors={state.errors}
        isPending={isPending}
        name='userName'
        defaultValue={userName || ''}
      />
      <Button disabled={isPending} type='submit'>
        Save
      </Button>
    </form>
  );
}
