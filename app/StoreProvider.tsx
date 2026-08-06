'use client';
import { Provider } from 'react-redux';
import { useState, type ReactNode } from 'react';
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
  const [store] = useState<AppStore>(() => {
    const newStore = makeStore();
    newStore.dispatch(initState({ tickets, statuses, activeStatus }));
    return newStore;
  });

  return <Provider store={store}>{children}</Provider>;
}
