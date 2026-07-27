create function public.get_ticket_priorities()
returns setof public.ticket_priority
language sql
stable
security invoker
set search_path = ''
as $$
  select unnest(enum_range(null::public.ticket_priority));
$$;

revoke all on function public.get_ticket_priorities()
from public, anon;
grant execute on function public.get_ticket_priorities()
to authenticated;
