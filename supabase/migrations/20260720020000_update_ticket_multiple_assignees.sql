drop function if exists public.update_ticket_assignee(uuid, uuid);

create function public.update_ticket_assignee(
  p_ticket_id uuid,
  p_profile_ids uuid[] default array[]::uuid[]
)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
begin
  delete from public.ticket_assignees
  where ticket_id = p_ticket_id;

  insert into public.ticket_assignees (ticket_id, profile_id)
  select p_ticket_id, profile_id
  from unnest(coalesce(p_profile_ids, array[]::uuid[])) as profile_id
  where profile_id is not null
  on conflict do nothing;
end;
$$;

revoke all on function public.update_ticket_assignee(uuid, uuid[])
from public, anon;

grant execute on function public.update_ticket_assignee(uuid, uuid[])
to authenticated;
