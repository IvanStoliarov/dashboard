import { getTickets, updateTicketAssignee } from '@/lib/actions';
import { getAllUsers } from '@/lib/data/profiles';

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
                <select
                  key={ticket.ticket_assignees.map(a => a.profile_id).join(',')}
                  multiple
                  id={`assigned_to_${ticket.id}`}
                  name='assigned_to'
                  defaultValue={assignee.map(a => a.profile_id)}
                >
                  <option value=''>Unassigned (select only)</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.username ?? user.email ?? 'Unnamed user'}
                    </option>
                  ))}
                </select>
                <button type='submit'>Update</button>
              </form>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
