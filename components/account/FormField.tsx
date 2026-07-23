'use client';
import { useEditForm } from './accountEditFormContext';

interface FormFieldProps {
  defaultValue: string;
  name: string;
}

export default function FormField({ defaultValue, name }: FormFieldProps) {
  const { errors, isPending } = useEditForm();
  const errorId = `${name}-error`;

  return (
    <div>
      <label
        htmlFor={name}
        className='mb-2 block text-sm font-medium text-zinc-800'
      >
        Username
      </label>
      <input
        disabled={isPending}
        defaultValue={defaultValue}
        type='text'
        id={name}
        name={name}
        aria-invalid={Boolean(errors?.[name]?.length)}
        aria-describedby={errors?.[name] ? errorId : undefined}
        className='h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10 disabled:cursor-not-allowed disabled:bg-zinc-50 disabled:text-zinc-500 disabled:opacity-70'
      />
      {errors?.[name] &&
        errors[name].map(message => (
          <p
            key={message}
            id={errorId}
            className='mt-2 text-sm text-red-600'
            role='alert'
          >
            {message}
          </p>
        ))}
    </div>
  );
}
