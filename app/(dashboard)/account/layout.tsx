import NavLink from '@/components/NavLink';
import Link from 'next/link';
import React from 'react';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
