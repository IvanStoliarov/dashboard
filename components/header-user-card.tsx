import { logout } from '@/app/auth/actions';
import { getUserData } from '@/lib/data/profiles';
import Link from 'next/link';

export default async function HeaderUserCart({ userId }: { userId: string }) {
  const profile = await getUserData(userId);
  if (!profile) return null;
  const { username } = profile;

  return (
    <div className='ml-auto'>
      <button
        type='button'
        popoverTarget='user-menu'
        aria-controls='user-menu'
        aria-label='Open user menu'
        className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-300'
      >
        {username.at(0)}
      </button>

      <div
        id='user-menu'
        popover='auto'
        className='absolute rounded-xl border border-gray-100 bg-white p-2 shadow-2xl inset-auto [position-area:bottom_span-left]'
      >
        <div className='flex flex-col gap-2'>
          <Link className='text-nowrap' href='/'>
            {username}
          </Link>
          <form action={logout}>
            <button
              type='submit'
              className='w-full text-nowrap rounded-lg border border-zinc-300 px-3.5 py-2 text-sm font-medium text-zinc-800 transition hover:border-zinc-400 hover:bg-zinc-50'
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
