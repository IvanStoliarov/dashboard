import React from 'react';
import Button from '../Button';
import { useAssignees } from './AssigneesContext';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface ActionsProps {
  asFormElement: boolean;
  asFilter: boolean;
}

export default function Actions({ asFormElement, asFilter }: ActionsProps) {
  const {
    isLoading,
    assigneeListChanged,
    assigneesList,
    updateList,
    ticketId,
    handleReset,
  } = useAssignees();
  const searchParams = useSearchParams();
  const path = usePathname();
  const router = useRouter();

  function handleSave() {
    if (asFilter) {
      const params = new URLSearchParams(searchParams);
      if (assigneesList.length > 0) {
        params.set(
          'filterbyuser',
          assigneesList.map(user => user.profile_id).join(','),
        );
      } else {
        params.delete('filterbyuser');
      }
      router.push(`${path}?${params}`);
    } else {
      updateList(ticketId);
    }
  }
  return (
    assigneeListChanged &&
    !asFormElement && (
      <div className='flex gap-2'>
        <Button variant='secondary' disabled={isLoading} onClick={handleReset}>
          Cancel
        </Button>
        <Button disabled={isLoading} onClick={handleSave}>
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    )
  );
}
