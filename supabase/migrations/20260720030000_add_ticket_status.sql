create type public.ticket_status as enum (
  'todo',
  'in_progress',
  'qa',
  'done'
);

alter table public.tickets
add column status public.ticket_status not null default 'todo';

grant update (status) on table public.tickets to authenticated;

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
  then
    new.ticket_updated_at := now();
    new.ticket_updated_by := auth.uid();
  end if;

  return new;
end;
$$;

drop trigger set_ticket_content_audit on public.tickets;

create trigger set_ticket_content_audit
  before update of title, description, status on public.tickets
  for each row
  execute function public.set_ticket_content_audit();
