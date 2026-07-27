import { logout } from '@/app/auth/actions';
import { fetchProfileDataById } from '@/lib/actions';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import PopoverLink from '@/components/PopoverLink';
import { createClient } from '@/lib/supabase/server';

export default async function HeaderUserCard() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims.sub;
  if (!userId) return null;

  const profile = await fetchProfileDataById(userId);
  if (!profile) return null;

  const { username } = profile;
  const displayName = username || 'User';
  const initial = displayName.at(0)?.toUpperCase() || 'U';

  return (
    <div className='ml-auto'>
      <button
        type='button'
        popoverTarget='user-menu'
        aria-controls='user-menu'
        aria-label='Open user menu'
        className='group flex items-center gap-2 rounded-full border border-zinc-200 bg-white py-1.5 pl-1.5 pr-3 text-sm font-medium text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
      >
        <span className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white shadow-sm'>
          {initial}
        </span>
        <span className='max-w-32 truncate'>{displayName}</span>
        <ChevronDownIcon
          aria-hidden='true'
          className='h-4 w-4 text-zinc-400 transition group-hover:text-zinc-600'
        />
      </button>

      <div
        id='user-menu'
        popover='auto'
        className='absolute inset-auto mt-2 min-w-52 rounded-2xl border border-zinc-200 bg-white p-2 shadow-[0_16px_40px_-18px_rgba(24,24,27,0.35)] [position-area:bottom_span-left]'
      >
        <div className='flex flex-col'>
          <PopoverLink
            className='rounded-xl px-3 py-2.5 transition hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-600'
            href='/account'
            popoverId='user-menu'
          >
            <span className='block text-xs font-medium uppercase tracking-wide text-zinc-400'>
              Signed in as
            </span>
            <span className='mt-0.5 block max-w-44 truncate text-sm font-semibold text-zinc-900'>
              {displayName}
            </span>
          </PopoverLink>
          <div className='my-1 border-t border-zinc-100' />
          <form action={logout} className='p-1'>
            <button
              type='submit'
              className='w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-600'
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
