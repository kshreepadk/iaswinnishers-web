-- Run this once in your Supabase project's SQL Editor (left sidebar → SQL Editor → New query).
-- Creates the table that stores every form submission from the website.

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text,
  phone text,
  stage text,        -- e.g. "Preparing for Prelims" (from the Contact form dropdown)
  message text,       -- free-text notes, if the form has that field
  source text not null -- which form/page this came from, e.g. "contact-form", "resources-ncert-booklist"
);

-- Row Level Security: ON by default in Supabase. Since all inserts happen
-- through our server-side API route (using the service role key, which
-- bypasses RLS entirely), we don't need to open this table up to public
-- writes. Leaving RLS enabled with no public policies means the table
-- cannot be read or written directly from the browser — only through
-- your API route. This is the secure default; no further action needed.
alter table leads enable row level security;
