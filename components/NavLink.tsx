'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  activeClassName?: string;
}

export default function NavLink({
  href,
  className = '',
  children,
  activeClassName = 'font-semibold text-blue-600',
}: NavLinkProps) {
  const pathName = usePathname();
  const isCurrent = pathName === href;
  return (
    <Link
      href={href}
      aria-current={isCurrent ? 'page' : undefined}
      className={`${className} ${isCurrent && activeClassName}`.trim()}
    >
      {children}
    </Link>
  );
}
