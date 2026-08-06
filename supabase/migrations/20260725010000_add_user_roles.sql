create type public.user_role as enum (
  'admin',
  'user'
);

alter table public.profiles
add column role public.user_role not null default 'user';

drop policy "Authenticated users can create tickets" on public.tickets;

create policy "Admins can create tickets"
on public.tickets
for insert
to authenticated
with check (
  (select auth.uid()) = created_by
  and (
    select profiles.role
    from public.profiles
    where profiles.id = (select auth.uid())
  ) = 'admin'
);

create schema if not exists private;

create view private.ticket_content_snapshot
with (security_barrier = true)
as
select id, title, description
from public.tickets;

revoke all on table private.ticket_content_snapshot
from public, anon, authenticated;
grant usage on schema private to authenticated;
grant select on table private.ticket_content_snapshot to authenticated;

drop policy "Authenticated users can update tickets" on public.tickets;

create policy "Authenticated users can update permitted ticket fields"
on public.tickets
for update
to authenticated
using (true)
with check (
  (
    select profiles.role
    from public.profiles
    where profiles.id = (select auth.uid())
  ) = 'admin'
  or exists (
    select 1
    from private.ticket_content_snapshot
    where ticket_content_snapshot.id = tickets.id
      and ticket_content_snapshot.title = tickets.title
      and ticket_content_snapshot.description = tickets.description
  )
);
