import { getTickets, updateTicketAssignee } from '@/lib/actions';
import { getAllUsers } from '@/lib/data/profiles';
import AssigneeMultiSelect from './AssigneeMultiSelect';

export default async function TicketList() {
  const [tickets, users] = await Promise.all([getTickets(), getAllUsers()]);

  return (
    <div>
      <h1>Tickets</h1>
      <ul>
        {tickets.map(ticket => {
          const assignee = ticket.ticket_assignees;

          return (
            <li key={ticket.id}>
              <h2>{ticket.title}</h2>
              <p>
                Assigned to:{' '}
                {assignee.map(a => a.profile.username).join(', ') ||
                  'Unassigned'}
              </p>
              <form action={updateTicketAssignee}>
                <input type='hidden' name='ticket_id' value={ticket.id} />
                <label htmlFor={`assigned_to_${ticket.id}`}>Change assignee</label>
                <AssigneeMultiSelect
                  id={`assigned_to_${ticket.id}`}
                  name='assigned_to'
                  users={users}
                  defaultValue={assignee.map(a => a.profile_id)}
                />
                <button type='submit'>Update</button>
              </form>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
