'use client';
import { AccountEditFormState, updateUser } from '@/lib/actions';
import React, { useActionState } from 'react';
import { AccountFormContextProvider } from './accountEditFormContext';

const initialState: AccountEditFormState = {
  success: false,
  message: '',
  errors: {},
};

export default function EditForm({ children }: { children: React.ReactNode }) {
  const [state, fromAction, isPending] = useActionState(
    updateUser,
    initialState,
  );
  return (
    <form action={fromAction} className='space-y-6' aria-busy={isPending}>
      <AccountFormContextProvider state={state} isPending={isPending}>
        {children}
      </AccountFormContextProvider>
    </form>
  );
}
