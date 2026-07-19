import NavLink from '@/components/NavLink';

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink href='/dashboard'>Dashboard</NavLink>
        </li>
      </ul>
    </nav>
  );
}
