create extension if not exists "pgcrypto";

create table if not exists public.archetype_prompts (
  id uuid primary key default gen_random_uuid(),
  sub_archetype text not null unique,
  recognition_prompt text not null,
  trigger_options jsonb not null default '[]'::jsonb,
  loop_prompt text not null,
  consequence_options jsonb not null default '[]'::jsonb,
  interruption_statement text not null,
  micro_actions jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.pattern_events
  add column if not exists trigger_type text,
  add column if not exists predicted_outcome text,
  add column if not exists action_taken text;

update public.pattern_events
set trigger_type = coalesce(trigger_type, pattern_type),
    action_taken = coalesce(action_taken,
      case
        when action = 'interrupt' then 'acted'
        when action = 'follow' then 'delayed'
        else null
      end
    )
where trigger_type is null or action_taken is null;

alter table public.pattern_events enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'pattern_events'
      and policyname = 'pattern_events_select_own'
  ) then
    create policy "pattern_events_select_own"
      on public.pattern_events
      for select
      using (auth.uid()::text = user_id);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'pattern_events'
      and policyname = 'pattern_events_insert_own'
  ) then
    create policy "pattern_events_insert_own"
      on public.pattern_events
      for insert
      with check (auth.uid()::text = user_id);
  end if;
end
$$;

insert into public.archetype_prompts (
  sub_archetype,
  recognition_prompt,
  trigger_options,
  loop_prompt,
  consequence_options,
  interruption_statement,
  micro_actions
) values
  (
    'stuck_aware',
    'You know the next step. You are stalling at the threshold.',
    '["Opening the work and stopping","Rewriting the plan again","Waiting for a better moment"]',
    'This is where momentum usually leaks out.',
    '["I lose the window","I keep circling","I push it to later"]',
    'The move is smaller than your fear.',
    '["Open the first file","Do the next visible step","Work for 2 minutes"]'
  ),
  (
    'overthinker',
    'You are replacing action with analysis.',
    '["Comparing options","Checking one more detail","Waiting for certainty"]',
    'More analysis will not produce movement.',
    '["I stay stuck","I delay the choice","I talk myself out of it"]',
    'Decide with the information you already have.',
    '["Pick the simplest option","Choose within 5 seconds","Start before you feel ready"]'
  ),
  (
    'identity_seeker',
    'Your self-image is clear, but your behavior is drifting.',
    '["Explaining who I am","Rehearsing the ideal version of me","Trying to match the image"]',
    'This is where identity stays abstract.',
    '["I postpone the real change","I protect the image","I repeat the old response"]',
    'Identity only matters when it changes the next move.',
    '["Do one concrete action","Choose the harder truthful step","Move before explaining yourself"]'
  ),
  (
    'self_sabotaging',
    'You are about to undo a real step forward.',
    '["Shrinking the commitment","Picking a distraction","Creating a reason to quit"]',
    'This is the familiar pullback.',
    '["I lose progress","I reset the work","I repeat the cycle"]',
    'Do not let the old reflex rename itself as prudence.',
    '["Keep the commitment","Finish the current step","Stay with the discomfort"]'
  ),
  (
    'high_ambition_frustrated',
    'You are starting fast and losing sequence.',
    '["Taking on too much","Switching targets","Pushing past structure"]',
    'Speed is replacing direction.',
    '["I lose the thread","I create more work","I fail to finish cleanly"]',
    'Progress needs shape before it needs more force.',
    '["Pick one target","Reduce the scope","Finish the current sequence"]'
  ),
  (
    'aftershock_witness',
    'An old reaction is returning under a new surface.',
    '["Reading into tone","Preparing for conflict","Reliving the last version"]',
    'This is the replay.',
    '["I react to the past","I lose the present","I repeat the emotional pattern"]',
    'What happened before is not happening again yet.',
    '["Name the trigger","Delay the reaction","Respond to the present only"]'
  ),
  (
    'divergent_mind',
    'You are holding two standards and acting from the weaker one.',
    '["Saying one thing and doing another","Protecting the exception","Trying to keep both sides comfortable"]',
    'The split becomes the pattern.',
    '["I stay divided","I blur my standard","I keep making exceptions"]',
    'Choose the standard you actually want to live by.',
    '["Pick one rule","Act consistently once","Stop defending the exception"]'
  ),
  (
    'early_improvement',
    'You are at the beginning again, before structure exists.',
    '["Starting from scratch","Changing systems too soon","Jumping to a new method"]',
    'Restarting feels productive, but it erases progress.',
    '["I lose traction","I reset the work","I never stabilize"]',
    'Keep the structure long enough for it to work.',
    '["Stay with one method","Do the next two minutes","Protect the current sequence"]'
  ),
  (
    'pattern_nerd',
    'You can see the pattern, but you are still watching it happen.',
    '["Naming the loop","Studying the sequence","Waiting for proof"]',
    'Insight is arriving late.',
    '["I keep observing","I miss the intervention point","I learn without changing"]',
    'Seeing it is not the same as interrupting it.',
    '["Act immediately","Choose the first correction","Interrupt before analyzing more"]'
  ),
  (
    'lurker_passive',
    'You are collecting more input instead of making the move.',
    '["Reading one more source","Staying in observer mode","Postponing the decision"]',
    'Clarity keeps getting deferred.',
    '["I remain invisible to myself","I delay the move","I keep circling the same idea"]',
    'You already have enough to begin.',
    '["Make one visible choice","Do the first action","Stop gathering and move"]'
  )
on conflict (sub_archetype) do update set
  recognition_prompt = excluded.recognition_prompt,
  trigger_options = excluded.trigger_options,
  loop_prompt = excluded.loop_prompt,
  consequence_options = excluded.consequence_options,
  interruption_statement = excluded.interruption_statement,
  micro_actions = excluded.micro_actions;