-- Run this in Supabase's SQL Editor AFTER schema.sql, to add the columns
-- the admin dashboard (/admin/leads) needs for tracking follow-up status.

alter table leads add column if not exists status text not null default 'new';
alter table leads add column if not exists notes text;

-- Keep status limited to a known set of values.
alter table leads drop constraint if exists leads_status_check;
alter table leads add constraint leads_status_check
  check (status in ('new', 'contacted', 'enrolled', 'not_interested'));
