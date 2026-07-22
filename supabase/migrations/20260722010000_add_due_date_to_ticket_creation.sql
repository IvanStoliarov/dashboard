drop function if exists public.create_ticket_with_assignee(text, text, uuid[]);

create function public.create_ticket_with_assignee(
  p_title text,
  p_description text,
  p_assigned_to uuid[] default array[]::uuid[],
  p_due_to date default null
)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $$
declare
  new_ticket_id uuid;
begin
  insert into public.tickets (title, description, due_to)
  values (p_title, p_description, p_due_to)
  returning id into new_ticket_id;

  insert into public.ticket_assignees (ticket_id, profile_id)
  select new_ticket_id, profile_id
  from unnest(coalesce(p_assigned_to, array[]::uuid[])) as profile_id
  where profile_id is not null
  on conflict do nothing;

  return new_ticket_id;
end;
$$;

revoke all on function public.create_ticket_with_assignee(text, text, uuid[], date)
from public, anon;
grant execute on function public.create_ticket_with_assignee(text, text, uuid[], date)
to authenticated;
