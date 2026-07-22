import NavLink from '@/components/NavLink';

export default function Nav() {
  return (
    <nav aria-label='Primary navigation'>
      <ul>
        <li>
          <NavLink href='/dashboard'>Dashboard</NavLink>
        </li>
      </ul>
    </nav>
  );
}
