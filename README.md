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

## Email setup (Resend) — do this once

When someone requests a free resource (NCERT booklist, study planner,
syllabus map), the site automatically emails them the PDF. This needs a
free [Resend](https://resend.com) account.

1. **Sign up** at resend.com (free tier: 3,000 emails/month, plenty for this).
2. **Get your API key**: in the Resend dashboard, go to **API Keys** →
   "Create API Key". Copy it.
3. **Add it locally**: put it in `.env.local` as `RESEND_API_KEY=...`
   (see `.env.local.example`).
4. **Add it to Vercel** too, same as the Supabase keys (Settings →
   Environment Variables), then redeploy.
5. **Set `SITE_URL`**: also in both `.env.local` and Vercel, set this to
   your actual site's address (e.g. `https://iaswinnishers.com`, or your
   `.vercel.app` URL if you haven't connected a custom domain yet) — this
   is what makes the download link inside the email actually work.

**Getting started vs. production:** by default, emails send from
`onboarding@resend.dev`, which works immediately with zero extra setup —
good for testing. Before this feels fully "real" to aspirants, verify your
own domain in Resend (Domains → Add Domain, then add the DNS records it
gives you) and change the `from` address in `src/lib/email.js` to something
like `IAS Winnishers <hello@iaswinnishers.com>`. Un-verified sending domains
can sometimes land in spam — verifying your domain fixes that.

### Adding a new downloadable resource later

Everything about a resource lives in one place: `src/lib/resources.js`. To
add a fourth one: drop the PDF into `public/resources/`, add one entry to
that file, then add a matching `<LeadForm source="resources-your-slug" />`
wherever you want the form to appear. No other file needs to change.

## Deploying

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
    LeadForm.jsx                Client component — reusable lead-magnet form (Resources, Blog)
  content/
    blog-posts.js                All 6 blog articles as structured data
  lib/
    supabaseServer.js            Server-only Supabase client (never exposed to the browser)
supabase/
  schema.sql                    Run once in Supabase's SQL Editor to create the leads table
public/
  logo.png
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
