'use client';
import { Provider } from 'react-redux';
import { useEffect, useState, type ReactNode } from 'react';
import { makeStore, type AppStore } from '@/lib/store';
import type { TicketData } from '@/lib/types';
import { initState } from '@/lib/features/tasksSlice';

interface StoreProviderProps {
  children: ReactNode;
  tickets: TicketData[];
  statuses: ('todo' | 'in_progress' | 'qa' | 'done')[];
  activeStatus: TicketData['status'] | undefined;
}

export default function StoreProvider({
  children,
  tickets,
  statuses,
  activeStatus,
}: StoreProviderProps) {
  const [store] = useState<AppStore>(() => makeStore());

  useEffect(() => {
    store.dispatch(initState({ tickets, statuses, activeStatus }));
  }, [tickets, statuses, activeStatus, store]);

  return <Provider store={store}>{children}</Provider>;
}
