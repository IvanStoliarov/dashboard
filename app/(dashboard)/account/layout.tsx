import NavLink from '@/components/NavLink';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) redirect('/login');
  return (
    <div className='md:grid grid-cols-[1fr_4fr] gap-5'>
      <aside>
        <nav>
          <ul>
            <li>
              <NavLink href='/account'>Account</NavLink>
            </li>
            <li>
              <NavLink href='/account/settings'>Settings</NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <section>{children}</section>
    </div>
  );
}
