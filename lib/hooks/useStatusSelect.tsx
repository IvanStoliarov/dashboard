import React, { createContext, useContext, useState } from 'react';
import { TicketData } from '../types';
interface StatusSelectState {
  isOpen: boolean;
  toggleIsOpen: () => void;
  close: () => void;
  updateCallback?:
    | (({
        ticketId,
        status,
      }: {
        ticketId: TicketData['id'];
        status: TicketData['status'];
      }) => void)
    | null;
}

const StatusSelectContext = createContext<StatusSelectState | null>(null);

export function StatusSelectProvider({
  children,
  updateCallback,
}: {
  children: React.ReactNode;
  updateCallback: StatusSelectState['updateCallback'];
}) {
  const [isOpen, setIsOpen] = useState(false);
  function toggleIsOpen() {
    setIsOpen(s => !s);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <StatusSelectContext.Provider
      value={{ isOpen, toggleIsOpen, close, updateCallback }}
    >
      {children}
    </StatusSelectContext.Provider>
  );
}

export function useStatusSelect() {
  const context = useContext(StatusSelectContext);
  if (!context) {
    throw new Error('Should be used inside StatusSelectContext');
  }

  return context;
}
