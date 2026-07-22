import { fetchUsersByIds } from '@/lib/actions';
import { TicketAssignee } from '@/lib/types';

export default async function AssigneeSelectWrapper({
  children,
  filterbyuser = '',
}: {
  children:
    | React.ReactNode
    | ((args: { assigneeList: TicketAssignee[] }) => React.ReactNode);
  filterbyuser?: string;
}) {
  const assigneeIds = filterbyuser?.split(',').filter(Boolean) ?? [];

  const assigneesData =
    assigneeIds.length > 0 ? await fetchUsersByIds(assigneeIds) : [];

  const assigneeList = assigneesData.map(user => ({
    profile_id: user.id,
    profile: { id: user.id, username: user.username },
  }));
  return typeof children === 'function' ? children({ assigneeList }) : children;
}
