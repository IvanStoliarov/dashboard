create function public.get_ticket_statuses()
returns setof public.ticket_status
language sql
stable
security invoker
set search_path = ''
as $$
  select unnest(enum_range(null::public.ticket_status));
$$;

revoke all on function public.get_ticket_statuses()
from public;
grant execute on function public.get_ticket_statuses()
to anon, authenticated;
