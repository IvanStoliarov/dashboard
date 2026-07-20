import type { Tables } from "./database.types";

export type Profile = Tables<'profiles'>
export type Ticket = Tables<'tickets'>

export interface TicketAssignee {
  profile_id: Profile['id'];
  profile: Pick<Profile, 'id' | 'username'>;
}

export interface TicketData extends Ticket {
  ticket_assignees: TicketAssignee[];
}
