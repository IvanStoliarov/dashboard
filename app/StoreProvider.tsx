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
}

export default function StoreProvider({
  children,
  tickets,
  statuses,
}: StoreProviderProps) {
  const [store] = useState<AppStore>(() => {
    const newStore = makeStore();
    newStore.dispatch(initState({ tickets, statuses }));
    return newStore;
  });

  return <Provider store={store}>{children}</Provider>;
}
