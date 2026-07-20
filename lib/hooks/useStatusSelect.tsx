import React, { createContext, useContext, useState } from 'react';
interface StatusSelectState {
  isOpen: boolean;
  toggleIsOpen: () => void;
  close: () => void;
}

const StatusSelectContext = createContext<StatusSelectState | null>(null);

export function StatusSelectProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  function toggleIsOpen() {
    setIsOpen(s => !s);
  }
  function close() {
    setIsOpen(false);
  }

  return (
    <StatusSelectContext.Provider value={{ isOpen, toggleIsOpen, close }}>
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
