import type { TicketAssignee } from '@/lib/types';

interface TicketAssigneeListProps {
  assignees: TicketAssignee[];
}

export default function TicketAssigneeList({
  assignees,
}: TicketAssigneeListProps) {
  if (assignees.length === 0) return null;

  const assigneeNames = assignees.map(
    item => item.profile.username ?? 'Unnamed user',
  );

  return (
    <div
      className='mt-4 flex items-center'
      aria-label={`Assigned to ${assigneeNames.join(', ')}`}
    >
      {assignees.slice(0, 4).map((item, assigneeIndex) => (
        <span
          key={item.profile_id}
          title={item.profile.username ?? 'Unnamed user'}
          className={`flex size-7 items-center justify-center rounded-full border-2 border-white bg-zinc-900 text-[10px] font-semibold uppercase text-white ${
            assigneeIndex > 0 ? '-ml-1.5' : ''
          }`}
        >
          {(item.profile.username ?? '?').slice(0, 2)}
        </span>
      ))}
      {assignees.length > 4 && (
        <span className='-ml-1.5 flex size-7 items-center justify-center rounded-full border-2 border-white bg-zinc-100 text-[10px] font-semibold text-zinc-600'>
          +{assignees.length - 4}
        </span>
      )}
      <span className='ml-2.5 truncate text-xs text-zinc-500'>
        {assigneeNames.join(', ')}
      </span>
    </div>
  );
}
