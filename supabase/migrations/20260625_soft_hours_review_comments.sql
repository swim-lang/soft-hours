create table if not exists soft_hours_review_comments (
  id text primary key,
  project text not null,
  page text not null,
  path text not null,
  review_id text not null,
  selector text not null,
  text_quote text,
  comment text not null,
  status text not null default 'open',
  viewport jsonb,
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create index if not exists soft_hours_review_comments_project_created_at_idx
on soft_hours_review_comments (project, created_at desc);

create index if not exists soft_hours_review_comments_project_review_id_idx
on soft_hours_review_comments (project, review_id);

alter table soft_hours_review_comments enable row level security;

drop policy if exists "Allow Soft Hours review comment reads" on soft_hours_review_comments;
create policy "Allow Soft Hours review comment reads"
on soft_hours_review_comments for select
to anon
using (project = 'soft-hours');

drop policy if exists "Allow Soft Hours review comment inserts" on soft_hours_review_comments;
create policy "Allow Soft Hours review comment inserts"
on soft_hours_review_comments for insert
to anon
with check (project = 'soft-hours');

drop policy if exists "Allow Soft Hours review comment status updates" on soft_hours_review_comments;
create policy "Allow Soft Hours review comment status updates"
on soft_hours_review_comments for update
to anon
using (project = 'soft-hours')
with check (project = 'soft-hours');
