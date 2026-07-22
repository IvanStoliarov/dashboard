import React from 'react';
import { useAssignees } from './AssigneesContext';

export default function Error() {
  const { saveError } = useAssignees();
  return (
    saveError && (
      <p role='alert' className='text-xs text-red-600'>
        {saveError}
      </p>
    )
  );
}
