create function public.create_ticket_with_assignee(
  p_title text,
  p_description text,
  p_assigned_to uuid default null
)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $$
declare
  new_ticket_id uuid;
begin
  insert into public.tickets (title, description)
  values (p_title, p_description)
  returning id into new_ticket_id;

  if p_assigned_to is not null then
    insert into public.ticket_assignees (ticket_id, profile_id)
    values (new_ticket_id, p_assigned_to);
  end if;

  return new_ticket_id;
end;
$$;

revoke all on function public.create_ticket_with_assignee(text, text, uuid)
from public, anon;
grant execute on function public.create_ticket_with_assignee(text, text, uuid)
to authenticated;
