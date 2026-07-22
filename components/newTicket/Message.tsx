import React from 'react';

interface MessageProps {
  message: string;
  isSuccess: boolean;
}

export default function Message({ message, isSuccess }: MessageProps) {
  return (
    <p
      role={isSuccess ? 'status' : 'alert'}
      className={`rounded-lg border px-3 py-2.5 text-sm ${
        isSuccess
          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
          : 'border-red-200 bg-red-50 text-red-700'
      }`}
    >
      {message}
    </p>
  );
}
