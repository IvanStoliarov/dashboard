import type { TicketAssignee } from '@/lib/types';

interface TicketAssigneeListProps {
  assignees: TicketAssignee[];
  compact?: boolean;
}

export default function TicketAssigneeList({
  assignees,
  compact = false,
}: TicketAssigneeListProps) {
  if (assignees.length === 0) return null;

  const assigneeNames = assignees.map(
    item => item.profile.username ?? 'Unnamed user',
  );

  const assigneeNamesToShow = `${assigneeNames.at(0)} ${assigneeNames.length > 1 ? `+${assigneeNames.length - 1} more` : ''}`;

  return (
    <div
      className={`${compact ? '' : 'mt-4'} flex min-w-0 items-center`}
      aria-label={`Assigned to ${assigneeNames.join(', ')}`}
      title={assigneeNames.join(', ')}
    >
      {assignees.slice(0, 4).map((item, assigneeIndex) => (
        <span
          key={item.profile_id}
          title={item.profile.username ?? 'Unnamed user'}
          className={`flex size-7 shrink-0 items-center justify-center rounded-full border-2 border-white bg-zinc-900 text-[10px] font-semibold uppercase text-white shadow-sm ${
            assigneeIndex > 0 ? '-ml-1.5' : ''
          }`}
        >
          {(item.profile.username ?? '?').slice(0, 2)}
        </span>
      ))}
      {assignees.length > 4 && (
        <span className='-ml-1.5 flex size-7 shrink-0 items-center justify-center rounded-full border-2 border-white bg-zinc-100 text-[10px] font-semibold text-zinc-600 shadow-sm'>
          +{assignees.length - 4}
        </span>
      )}
      {!compact && (
        <span className='ml-2.5 truncate text-xs text-zinc-500'>
          {assigneeNamesToShow}
        </span>
      )}
    </div>
  );
}
