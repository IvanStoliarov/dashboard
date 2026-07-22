import { TicketAssignee } from '@/lib/types';

export default function CurrentAssignees({
  assigneesList,
  addOrRemoveAssignee,
}: {
  assigneesList: TicketAssignee[];
  addOrRemoveAssignee: (user: TicketAssignee) => void;
}) {
  return (
    <ul
      aria-label='Current assignees'
      className='max-h-44 overflow-y-auto p-1.5'
    >
      {assigneesList.map(assignee => (
        <li key={assignee.profile_id}>
          <button
            onClick={() => addOrRemoveAssignee(assignee)}
            type='button'
            aria-pressed='true'
            className='flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm text-zinc-700 transition hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500'
          >
            <span className='flex size-7 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-semibold uppercase text-white'>
              {(assignee.profile.username ?? '?').slice(0, 2)}
            </span>
            <span className='min-w-0 flex-1 truncate'>
              {assignee.profile.username ?? 'Unnamed user'}
            </span>
            <span className='text-xs font-medium text-blue-600'>Assigned</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
