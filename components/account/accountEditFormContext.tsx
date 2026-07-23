import { AccountEditFormState } from '@/lib/actions';
import React, { useContext } from 'react';
import { createContext } from 'react';

const FormContext = createContext<
  (AccountEditFormState & { isPending: boolean }) | null
>(null);

export function AccountFormContextProvider({
  children,
  state,
  isPending,
}: {
  children: React.ReactNode;
  state: AccountEditFormState;
  isPending: boolean;
}) {
  return (
    <FormContext.Provider value={{ ...state, isPending }}>
      {children}
    </FormContext.Provider>
  );
}

export function useEditForm() {
  const context = useContext(FormContext);
  if (!context) throw new Error('Used outside of FormContext');
  return context;
}
