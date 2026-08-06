create type public.ticket_priority as enum (
  'low',
  'medium',
  'high',
  'urgent'
);

alter table public.tickets
add column priority public.ticket_priority not null default 'medium';

grant update (priority) on table public.tickets to authenticated;

create or replace function public.set_ticket_content_audit()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.title is distinct from old.title
    or new.description is distinct from old.description
    or new.status is distinct from old.status
    or new.due_to is distinct from old.due_to
    or new.priority is distinct from old.priority
  then
    new.ticket_updated_at := now();
    new.ticket_updated_by := auth.uid();
  end if;

  return new;
end;
$$;

drop trigger set_ticket_content_audit on public.tickets;

create trigger set_ticket_content_audit
  before update of title, description, status, due_to, priority on public.tickets
  for each row
  execute function public.set_ticket_content_audit();
