-- PropFlow authentication foundation for Supabase.
-- Run this in the Supabase SQL editor.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  role text check (role is null or role in ('agency', 'landlord', 'tenant')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

grant select, insert, update on public.profiles to authenticated;

drop policy if exists "Profiles can read own profile" on public.profiles;
create policy "Profiles can read own profile"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id);

drop policy if exists "Profiles can insert own profile" on public.profiles;
create policy "Profiles can insert own profile"
  on public.profiles
  for insert
  to authenticated
  with check (auth.uid() = id);

drop policy if exists "Profiles can update own profile" on public.profiles;
create policy "Profiles can update own profile"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

create or replace function public.touch_profile_updated_at()
returns trigger
language plpgsql
as '
begin
  new.updated_at = now();
  return new;
end;
';

drop trigger if exists touch_profile_updated_at on public.profiles;
create trigger touch_profile_updated_at
  before update on public.profiles
  for each row execute function public.touch_profile_updated_at();

create or replace function public.create_profile_on_signup()
returns trigger
language plpgsql
security definer
set search_path = public
as '
begin
  insert into public.profiles (id, email, role)
  values (
    new.id,
    new.email,
    nullif(new.raw_user_meta_data->>''role'', '''')
  )
  on conflict (id) do update
    set email = excluded.email,
        role = coalesce(public.profiles.role, excluded.role),
        updated_at = now();
  return new;
end;
';

drop trigger if exists create_profile_on_signup on auth.users;
create trigger create_profile_on_signup
  after insert on auth.users
  for each row execute function public.create_profile_on_signup();
