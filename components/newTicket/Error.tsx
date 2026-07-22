import React from 'react';

interface ErrorProps {
  errors: string[];
}

export default function Error({ errors }: ErrorProps) {
  return (
    <div id='title-error' className='mt-2 space-y-1' role='alert'>
      {errors.map((message, index) => (
        <p className='text-sm text-red-600' key={`${message}-${index}`}>
          {message}
        </p>
      ))}
    </div>
  );
}
