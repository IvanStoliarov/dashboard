import { createContext, useContext, useState, type ReactNode } from 'react';

interface SelectState {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

const SelectContext = createContext<SelectState | null>(null);

export function SelectProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(isOpen => !isOpen);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <SelectContext.Provider value={{ isOpen, toggle, close }}>
      {children}
    </SelectContext.Provider>
  );
}

export function useSelect() {
  const context = useContext(SelectContext);
  if (!context) throw new Error('useSelect must be used inside SelectProvider');
  return context;
}
