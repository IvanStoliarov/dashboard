import { TicketAssignee } from '@/lib/types';
import { useAssignees } from './AssigneesContext';

type User = {
  email: string | null;
  id: string;
  username: string | null;
};

interface UserButtonProps {
  user: User;
}
export default function UserButton({ user }: UserButtonProps) {
  const { assigneesList, addOrRemoveAssignee } = useAssignees();
  const isAssigned = assigneesList.map(el => el.profile_id).includes(user.id);
  const displayName = user.username ?? user.email ?? 'Unnamed user';
  const profile = {
    profile: { id: user.id, username: user.username },
    profile_id: user.id,
  };

  function handleClick(user: TicketAssignee) {
    addOrRemoveAssignee(user);
  }
  return (
    <li key={user.id}>
      <button
        type='button'
        onClick={() => handleClick(profile)}
        aria-pressed={isAssigned}
        className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 ${isAssigned ? 'bg-blue-50 text-blue-900' : 'text-zinc-700 hover:bg-zinc-50'}`}
      >
        <span
          className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold uppercase ${isAssigned ? 'bg-blue-600 text-white' : 'bg-zinc-100 text-zinc-600'}`}
        >
          {displayName.slice(0, 2)}
        </span>
        <span className='min-w-0 flex-1 truncate'>{displayName}</span>
        {isAssigned && (
          <span className='text-xs font-medium text-blue-600'>Assigned</span>
        )}
      </button>
    </li>
  );
}
