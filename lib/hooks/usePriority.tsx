import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { Ticket } from '../types';

interface PriorityState {
  value: Ticket['priority'];
  setValue: Dispatch<SetStateAction<'low' | 'medium' | 'high' | 'urgent'>>;
}

interface PriorityProviderProps {
  initialValue: Ticket['priority'];
  children: React.ReactNode;
}

const PriorityContext = createContext<PriorityState | null>(null);

export function PriorityProvider({
  initialValue,
  children,
}: PriorityProviderProps) {
  const [value, setValue] = useState(initialValue);
  return (
    <PriorityContext.Provider value={{ value, setValue }}>
      {children}
    </PriorityContext.Provider>
  );
}

export function usePriority() {
  const context = useContext(PriorityContext);
  if (!context) throw new Error('Used outside of PriorityContext');
  return context;
}
