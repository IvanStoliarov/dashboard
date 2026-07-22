import { updateTicketAssigneeList } from '@/lib/actions';
import { TicketAssignee, TicketData } from '@/lib/types';
import React, { createContext, useContext, useState } from 'react';

interface AssigneesState {
  isOpen: boolean;
  toggleOpen: () => void;
  close: () => void;
  assigneesList: TicketData['ticket_assignees'];
  setAssigneesList: React.Dispatch<React.SetStateAction<TicketAssignee[]>>;
  assigneeListChanged: boolean;
  ticketId: TicketData['id'];
  updateList: (id: TicketData['id']) => void;
  isLoading: boolean;
  saveError: string | null;
  handleReset: () => void;
  addOrRemoveAssignee: (user: TicketAssignee) => void;
}

const Context = createContext<AssigneesState | null>(null);

export default function AssigneesContext({
  children,
  initialAssigneesList,
  ticketId,
}: {
  children: React.ReactNode;
  initialAssigneesList: TicketData['ticket_assignees'];
  ticketId: TicketData['id'];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [assigneesList, setAssigneesList] = useState(initialAssigneesList);
  function toggleOpen() {
    setIsOpen(s => !s);
  }

  async function updateList(ticketId: TicketData['id']) {
    setIsLoading(true);
    setSaveError(null);
    try {
      const { error } = await updateTicketAssigneeList(ticketId, assigneesList);
      if (error) {
        setSaveError("Couldn't save assignees. Please try again.");
        return;
      }

      close();
    } catch {
      setSaveError("Couldn't save assignees. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function close() {
    setIsOpen(false);
  }

  function handleReset() {
    setAssigneesList(initialAssigneesList);
    setSaveError(null);
  }

  function addOrRemoveAssignee(user: TicketAssignee) {
    const isInList = assigneesList.some(
      value => value.profile_id === user.profile_id,
    );
    const data = isInList
      ? assigneesList.filter(
          assignee => assignee.profile_id !== user.profile_id,
        )
      : [...assigneesList, user];

    setAssigneesList(data);
  }

  const initialIds = initialAssigneesList
    .map(({ profile_id }) => profile_id)
    .toSorted();

  const currentIds = assigneesList
    .map(({ profile_id }) => profile_id)
    .toSorted();

  const assigneeListChanged =
    initialIds.length !== currentIds.length ||
    initialIds.some((id, index) => id !== currentIds[index]);

  return (
    <Context.Provider
      value={{
        isOpen,
        toggleOpen,
        close,
        assigneesList,
        setAssigneesList,
        assigneeListChanged,
        ticketId,
        updateList,
        isLoading,
        saveError,
        handleReset,
        addOrRemoveAssignee,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useAssignees() {
  const context = useContext(Context);
  if (!context) throw new Error('Used outside Context');
  return context;
}
