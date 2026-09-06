create table if not exists public.papers (
  id text primary key,
  openalex_id text not null,
  title text not null,
  abstract text,
  authors jsonb not null default '[]'::jsonb,
  venue text,
  year integer,
  citation_count integer not null default 0,
  oa_pdf_url text,
  oa_url text,
  doi text,
  created_at timestamptz not null default now()
);

create table if not exists public.users_saved_papers (
  user_id uuid not null references auth.users(id) on delete cascade,
  paper_id text not null references public.papers(id) on delete cascade,
  tags text[] not null default '{}',
  note text not null default '',
  saved_at timestamptz not null default now(),
  primary key (user_id, paper_id)
);

create table if not exists public.explanations_cache (
  text_hash text primary key,
  selected_text text not null,
  explanation text not null,
  created_at timestamptz not null default now()
);

alter table public.papers enable row level security;
alter table public.users_saved_papers enable row level security;
alter table public.explanations_cache enable row level security;

grant select, insert, update on public.papers to anon, authenticated;
grant select, insert, update, delete on public.users_saved_papers to authenticated;
grant select, insert, update on public.explanations_cache to anon, authenticated;

drop policy if exists "papers are readable and cacheable" on public.papers;
create policy "papers are readable and cacheable" on public.papers for all to anon, authenticated using (true) with check (true);

drop policy if exists "users manage their saved papers" on public.users_saved_papers;
create policy "users manage their saved papers" on public.users_saved_papers for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

drop policy if exists "explanations are readable and cacheable" on public.explanations_cache;
create policy "explanations are readable and cacheable" on public.explanations_cache for all to anon, authenticated using (true) with check (true);