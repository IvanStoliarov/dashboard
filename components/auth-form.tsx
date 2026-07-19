'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { login, signup, type AuthActionState } from '@/app/auth/actions';

type AuthMode = 'login' | 'signup';

const initialState: AuthActionState = {};

export function AuthForm({ mode }: { mode: AuthMode }) {
  const action = mode === 'login' ? login : signup;
  const [state, formAction, isPending] = useActionState(action, initialState);
  const isLogin = mode === 'login';

  return (
    <form action={formAction} className='mt-8 space-y-5' noValidate>
      {!isLogin && (
        <div>
          <label
            htmlFor='username'
            className='mb-2 block text-sm font-medium text-zinc-800'
          >
            Username
          </label>
          <input
            id='username'
            name='username'
            type='text'
            autoComplete='username'
            minLength={3}
            maxLength={30}
            pattern='[A-Za-z0-9_ -]{3,30}'
            required
            aria-invalid={Boolean(state.errors?.username)}
            aria-describedby={
              state.errors?.username ? 'username-error' : undefined
            }
            className='h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10'
            placeholder='Firstname Lastname'
          />
          {state.errors?.username && (
            <p id='username-error' className='mt-2 text-sm text-red-600'>
              {state.errors.username}
            </p>
          )}
        </div>
      )}

      <div>
        <label
          htmlFor='email'
          className='mb-2 block text-sm font-medium text-zinc-800'
        >
          Email address
        </label>
        <input
          id='email'
          name='email'
          type='email'
          autoComplete='email'
          required
          aria-invalid={Boolean(state.errors?.email)}
          aria-describedby={state.errors?.email ? 'email-error' : undefined}
          className='h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10'
          placeholder='you@example.com'
        />
        {state.errors?.email && (
          <p id='email-error' className='mt-2 text-sm text-red-600'>
            {state.errors.email}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor='password'
          className='mb-2 block text-sm font-medium text-zinc-800'
        >
          Password
        </label>
        <input
          id='password'
          name='password'
          type='password'
          autoComplete={isLogin ? 'current-password' : 'new-password'}
          minLength={6}
          required
          aria-invalid={Boolean(state.errors?.password)}
          aria-describedby={
            state.errors?.password ? 'password-error' : undefined
          }
          className='h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10'
          placeholder='At least 6 characters'
        />
        {state.errors?.password && (
          <p id='password-error' className='mt-2 text-sm text-red-600'>
            {state.errors.password}
          </p>
        )}
      </div>

      {state.message && (
        <p
          role='alert'
          className='rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700'
        >
          {state.message}
        </p>
      )}

      <button
        type='submit'
        disabled={isPending}
        className='mt-2 flex h-11 w-full items-center justify-center rounded-lg bg-zinc-950 px-4 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60'
      >
        {isPending
          ? mode === 'login'
            ? 'Signing in...'
            : 'Creating account...'
          : mode === 'login'
            ? 'Sign in'
            : 'Create account'}
      </button>

      <p className='text-center text-sm text-zinc-600'>
        {isLogin ? 'New here?' : 'Already have an account?'}{' '}
        <Link
          href={isLogin ? '/signup' : '/login'}
          className='font-medium text-zinc-950 underline underline-offset-4'
        >
          {isLogin ? 'Create an account' : 'Sign in'}
        </Link>
      </p>
    </form>
  );
}
