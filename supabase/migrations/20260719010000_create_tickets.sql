create table public.tickets (
  id uuid primary key default gen_random_uuid(),
  created_by uuid not null default auth.uid()
    references public.profiles (id) on delete restrict,
  title text not null,
  description text not null,
  created_at timestamptz not null default now(),
  ticket_updated_at timestamptz,
  ticket_updated_by uuid
    references public.profiles (id) on delete restrict,
  constraint tickets_update_audit_complete check (
    (ticket_updated_at is null and ticket_updated_by is null)
    or
    (ticket_updated_at is not null and ticket_updated_by is not null)
  )
);

create index tickets_created_by_idx on public.tickets (created_by);

create table public.ticket_assignees (
  ticket_id uuid not null
    references public.tickets (id) on delete cascade,
  profile_id uuid not null
    references public.profiles (id) on delete restrict,
  primary key (ticket_id, profile_id)
);

create index ticket_assignees_profile_id_idx
on public.ticket_assignees (profile_id);

create function public.set_ticket_content_audit()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.title is distinct from old.title
    or new.description is distinct from old.description
  then
    new.ticket_updated_at := now();
    new.ticket_updated_by := auth.uid();
  end if;

  return new;
end;
$$;

create trigger set_ticket_content_audit
  before update of title, description on public.tickets
  for each row
  execute function public.set_ticket_content_audit();

create function public.set_ticket_assignment_audit()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  changed_ticket_id uuid;
begin
  if tg_op = 'INSERT' then
    changed_ticket_id := new.ticket_id;
  else
    changed_ticket_id := old.ticket_id;
  end if;

  update public.tickets
  set
    ticket_updated_at = now(),
    ticket_updated_by = auth.uid()
  where id = changed_ticket_id;

  return null;
end;
$$;

create trigger set_ticket_assignment_audit
  after insert or delete on public.ticket_assignees
  for each row
  execute function public.set_ticket_assignment_audit();

revoke all on function public.set_ticket_content_audit() from public;
revoke all on function public.set_ticket_content_audit() from anon, authenticated;
revoke all on function public.set_ticket_assignment_audit() from public;
revoke all on function public.set_ticket_assignment_audit()
from anon, authenticated;

alter table public.tickets enable row level security;
alter table public.ticket_assignees enable row level security;

revoke all on table public.tickets from anon, authenticated;
grant select, delete on table public.tickets to authenticated;
grant insert (title, description) on table public.tickets to authenticated;
grant update (title, description) on table public.tickets to authenticated;

revoke all on table public.ticket_assignees from anon, authenticated;
grant select, delete on table public.ticket_assignees to authenticated;
grant insert (ticket_id, profile_id)
on table public.ticket_assignees
to authenticated;

create policy "Authenticated users can view tickets"
on public.tickets
for select
to authenticated
using (true);

create policy "Authenticated users can create tickets"
on public.tickets
for insert
to authenticated
with check ((select auth.uid()) = created_by);

create policy "Authenticated users can update tickets"
on public.tickets
for update
to authenticated
using (true)
with check (true);

create policy "Creators can delete tickets"
on public.tickets
for delete
to authenticated
using ((select auth.uid()) = created_by);

create policy "Authenticated users can view ticket assignments"
on public.ticket_assignees
for select
to authenticated
using (true);

create policy "Authenticated users can add ticket assignments"
on public.ticket_assignees
for insert
to authenticated
with check (true);

create policy "Authenticated users can remove ticket assignments"
on public.ticket_assignees
for delete
to authenticated
using (true);

drop policy "Users can view their own profile" on public.profiles;

create policy "Authenticated users can view profiles"
on public.profiles
for select
to authenticated
using (true);
