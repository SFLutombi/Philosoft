create extension if not exists "pgcrypto";

create table if not exists public.pattern_events (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  created_at timestamptz not null default timezone('utc', now()),
  pattern_type text not null,
  action text not null check (action in ('interrupt', 'follow')),
  note text
);

alter table public.pattern_events enable row level security;

create policy "pattern_events_select_own"
  on public.pattern_events
  for select
  using (auth.uid()::text = user_id);

create policy "pattern_events_insert_own"
  on public.pattern_events
  for insert
  with check (auth.uid()::text = user_id);
