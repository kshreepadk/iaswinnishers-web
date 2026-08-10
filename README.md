# IAS Winnishers — Next.js + Tailwind + Supabase

The framework rebuild of the site: Next.js (React) + Tailwind CSS for the
frontend, Supabase (Postgres) for the backend. This replaces the original
plain HTML site entirely — all pages (Home, Programs, Resources, Career
Counselling, About, Blog + 6 articles, Contact) are built, and forms now
save real submissions to a database instead of just showing a popup.

## Running it locally

You'll need [Node.js](https://nodejs.org) installed (version 18+).

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`. Note: the forms won't actually save
anything until you complete the backend setup below.

## Backend setup (Supabase) — do this once

The Contact form and every "send me this resource" form on the site submit
to `/api/leads`, which saves them into a Supabase database table. Without
this setup, submitting a form will show an error instead of succeeding.

1. **Create a free account** at [supabase.com](https://supabase.com) and
   create a new project (pick any name/region; the free tier is plenty for
   this).
2. **Create the database table**: in your Supabase project, go to the
   **SQL Editor** in the left sidebar → "New query", paste in the contents
   of `supabase/schema.sql` from this project, and click "Run." This creates
   the `leads` table that stores every submission.
3. **Get your API keys**: go to **Settings → API** in your Supabase project.
   You need two values:
   - **Project URL** (looks like `https://abcdefgh.supabase.co`)
   - **service_role key** (under "Project API keys" — click "Reveal" to see
     it; this is a long secret string, different from the "anon" key)
4. **Add them locally**: copy `.env.local.example` to a new file named
   `.env.local` in the project root, and paste in your real URL and key.
5. **Add them to Vercel** (for the live site): in your Vercel project →
   Settings → Environment Variables, add `SUPABASE_URL` and
   `SUPABASE_SERVICE_ROLE_KEY` with the same values. Redeploy after adding
   them (Vercel → Deployments → click the "..." on the latest one → Redeploy).
6. **Restart** `npm run dev` if it was already running, so it picks up the
   new `.env.local` file.

Once this is done, submit a test entry through the Contact form, then check
Supabase → **Table Editor → leads** — your test submission should appear
there. That confirms everything is wired up correctly.

### Viewing your leads day-to-day

Supabase's **Table Editor** (in the left sidebar) is a spreadsheet-like view
of every submission — name, email, phone, which form it came from (the
`source` column), and when. No extra tool needed to check for new leads.

### ⚠️ Never commit `.env.local`

It's already listed in `.gitignore`, so a normal `git add .` / `git commit`
won't include it — but never manually add it or paste its contents
anywhere public. The service role key has full access to your database.

## How resource downloads work

There's no email service involved at all — it's deliberately simple. The
three free resources (NCERT booklist, study planner, syllabus map) are
just static PDF files sitting in `public/resources/`, which makes them
directly downloadable from the live site the moment it's deployed (e.g.
`https://iaswinnishers.com/resources/ncert-booklist.pdf` works on its own).

When someone fills in the form for one of them:
1. Their name and email are saved to the `leads` table in Supabase (same
   as every other form on the site).
2. The browser immediately downloads the matching PDF — no waiting on an
   email, no third-party service, nothing that can silently fail.

### Adding a new downloadable resource later

1. Drop the new PDF into `public/resources/`.
2. In `src/app/resources/page.jsx`, add one entry to the `RESOURCES` array
   at the top (title, body text, and the `file` path).
3. That's it — the card, the form, and the instant download all just work
   from that one entry.

## Admin dashboard — do this once

Every form submission (Contact form, resource downloads, newsletter
signups) is saved to Supabase, but checking a raw database table isn't
practical day-to-day. There's a simple, password-protected dashboard at
**`/admin/leads`** for you and your coaches to actually work leads —
mark someone Contacted/Enrolled/Not Interested, add follow-up notes, and
filter the list.

### Setup

1. **Run the migration**: in Supabase's SQL Editor, run the contents of
   `supabase/migration-002-admin-dashboard.sql` (adds the `status` and
   `notes` columns to the `leads` table you already created).
2. **Set a password**: in `.env.local`, set `ADMIN_PASSWORD` to whatever
   you and your coaches will type in to log in. Add the same value in
   Vercel's Environment Variables.
3. **Set a session secret**: also set `ADMIN_SESSION_SECRET` to a long
   random string (this is *not* a password anyone types — it's what keeps
   login sessions secure). Run `openssl rand -hex 32` in a terminal to
   generate one, or use any password generator. Add it to Vercel too.
4. Restart `npm run dev` (or redeploy on Vercel) so the new environment
   variables take effect.

### Using it

Go to `yoursite.com/admin/login`, enter the password, and you're in. This
page is intentionally **not linked anywhere on the public site** — it's
only reachable if you type the URL directly, and it's excluded from search
engines via `robots.txt`.

### An honest limitation of this approach

This uses one shared password for everyone with admin access — there's no
way to tell which coach made a particular change, and if the password
leaks, everyone needs a new one. That's a fine trade-off for a small team
checking leads once a day, but it's not real multi-user access control. If
you eventually want individual coach logins (each coach only sees their
own assigned leads, audit history of who changed what), that's a natural
upgrade to build on Supabase's own Authentication system — a bigger step,
worth doing once the team and lead volume actually justify it.



1. Push this project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com), sign in with GitHub, "Add New
   Project," select this repo, and click "Deploy" — Vercel auto-detects
   Next.js, no configuration needed.
3. Add the two Supabase environment variables (see above) before or after
   the first deploy — either way, redeploy once they're set.
4. To use your real domain: Vercel project → Settings → Domains → add
   `iaswinnishers.com`, then update your domain's DNS records as instructed
   there.

From then on, every push to the `main` branch on GitHub automatically
redeploys the live site.

## Project structure

```
src/
  app/
    layout.jsx              Root layout — wraps every page in Header + Footer
    page.jsx                 Homepage
    globals.css               Tailwind imports, fonts, shared classes (.btn, .eyebrow, .card, .field-input, .prose-content)
    about/page.jsx             About Us
    programs/page.jsx          Programs (all 7 programs)
    resources/page.jsx         Resources (lead magnets)
    career-counselling/page.jsx
    contact/page.jsx           Contact + booking form
    blog/page.jsx               Blog listing
    blog/[slug]/page.jsx        Single dynamic route renders all 6 blog posts
    api/leads/route.js          Backend endpoint — saves form submissions to Supabase
  components/
    Header.jsx                 Nav bar + mobile menu
    Footer.jsx
    PageHero.jsx                Shared breadcrumb/heading block used on every inner page
    ContactForm.jsx             Client component — the Contact page's booking form
    LeadForm.jsx                Client component — reusable lead-magnet form, triggers instant PDF download
    VideoEmbed.jsx               Lazy-loading YouTube embed (thumbnail + play button facade)
  content/
    blog-posts.js                All 6 blog articles as structured data
  lib/
    supabaseServer.js            Server-only Supabase client (never exposed to the browser)
    youtube.js                    Fetches latest videos from the YouTube channel's RSS feed
supabase/
  schema.sql                    Run once in Supabase's SQL Editor to create the leads table
public/
  logo.png
  resources/                     The three downloadable PDFs (NCERT booklist, study planner, syllabus map)
tailwind.config.js               Design tokens (colors, fonts)
.env.local.example                Template for your local secret keys
```

## Editing content

Nothing is duplicated across files — Header and Footer are each defined
**once**. To edit a page's text, open its `page.jsx` file; most content
sits in plain arrays near the top (e.g. `FEATURES`, `PROGRAMS`,
`TESTIMONIALS` in the homepage) which is usually the easiest place to make
a change. To add a new blog post, add one entry to `src/content/blog-posts.js`
— no new page file needed.

## What's next (LMS roadmap)

This backend setup (Supabase) is also the foundation for the actual student
learning platform when you're ready to build it — Supabase includes user
authentication and file storage alongside the database, so logins, course
content, and student dashboards can be built on the same system rather than
starting over. That's a substantially bigger project than this form-capture
setup — worth planning as its own phase when you're ready.
