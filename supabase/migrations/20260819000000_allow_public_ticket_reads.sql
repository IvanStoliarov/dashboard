grant select on table public.tickets to anon;
grant select on table public.ticket_assignees to anon;
grant select (id, username) on table public.profiles to anon;

create policy "Anyone can view tickets"
on public.tickets
for select
to anon
using (true);

create policy "Anyone can view ticket assignments"
on public.ticket_assignees
for select
to anon
using (true);

create policy "Anyone can view public profile fields"
on public.profiles
for select
to anon
using (true);
