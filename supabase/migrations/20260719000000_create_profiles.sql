create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  username text
);

alter table public.profiles enable row level security;

revoke all on table public.profiles from anon, authenticated;
grant select on table public.profiles to authenticated;
grant update (username) on table public.profiles to authenticated;

create policy "Users can view their own profile"
on public.profiles
for select
to authenticated
using ((select auth.uid()) = id);

create policy "Users can update their own username"
on public.profiles
for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

insert into public.profiles (id, email, username)
select
  id,
  email,
  raw_user_meta_data ->> 'username'
from auth.users;

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, username)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'username'
  );

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
