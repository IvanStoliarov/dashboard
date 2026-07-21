grant update (due_to) on table public.tickets to authenticated;

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
  then
    new.ticket_updated_at := now();
    new.ticket_updated_by := auth.uid();
  end if;

  return new;
end;
$$;

drop trigger set_ticket_content_audit on public.tickets;

create trigger set_ticket_content_audit
  before update of title, description, status, due_to on public.tickets
  for each row
  execute function public.set_ticket_content_audit();
