create function public.update_ticket_assignee(
  p_ticket_id uuid,
  p_profile_id uuid default null
)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
begin
  delete from public.ticket_assignees
  where ticket_id = p_ticket_id;

  if p_profile_id is not null then
    insert into public.ticket_assignees (ticket_id, profile_id)
    values (p_ticket_id, p_profile_id);
  end if;
end;
$$;

revoke all on function public.update_ticket_assignee(uuid, uuid)
from public, anon;

grant execute on function public.update_ticket_assignee(uuid, uuid)
to authenticated;
