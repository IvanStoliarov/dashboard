revoke update (title, description)
on table public.tickets
from authenticated;

drop policy "Authenticated users can update permitted ticket fields"
on public.tickets;

create policy "Authenticated users can update tickets"
on public.tickets
for update
to authenticated
using (true)
with check (true);

drop view private.ticket_content_snapshot;

create function public.update_ticket_content(
  p_ticket_id uuid,
  p_title text,
  p_description text
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  updated_ticket_id uuid;
begin
  if not exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  ) then
    raise insufficient_privilege
      using message = 'Admin role required to edit ticket content';
  end if;

  update public.tickets
  set
    title = p_title,
    description = p_description
  where id = p_ticket_id
  returning id into updated_ticket_id;

  if updated_ticket_id is null then
    raise no_data_found using message = 'Ticket not found';
  end if;

  return updated_ticket_id;
end;
$$;

revoke all on function public.update_ticket_content(uuid, text, text)
from public, anon, authenticated;
grant execute on function public.update_ticket_content(uuid, text, text)
to authenticated;
