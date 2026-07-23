import EditForm from '@/components/account/EditForm';
import EditFormMessage from '@/components/account/EditFormMessage';
import FormField from '@/components/account/FormField';
import { fetchProfileDataById } from '@/lib/actions';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function AccountPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) redirect('/login');

  const profile = await fetchProfileDataById(data.user.id);

  return (
    <div className='mx-auto max-w-2xl'>
      <header className='border-b border-zinc-100 pb-6'>
        <p className='text-sm font-medium text-zinc-500'>Profile</p>
        <h1 className='mt-1 text-2xl font-semibold tracking-tight text-zinc-950'>
          Account settings
        </h1>
        <p className='mt-2 max-w-xl text-sm leading-6 text-zinc-500'>
          Manage the name that identifies you across your team workspace.
        </p>
      </header>

      <section className='mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm'>
        <div className='border-b border-zinc-200 bg-zinc-50 px-5 py-4 sm:px-6'>
          <h2 className='text-sm font-semibold text-zinc-950'>
            Profile information
          </h2>
          <p className='mt-1 text-sm leading-5 text-zinc-500'>
            This information is visible to other members of your workspace.
          </p>
        </div>
        <div className='p-5 sm:p-6'>
          <EditForm>
            <>
              <FormField
                name='userName'
                defaultValue={profile?.username || ''}
              />
              <EditFormMessage />
            </>
          </EditForm>
        </div>
      </section>
    </div>
  );
}
