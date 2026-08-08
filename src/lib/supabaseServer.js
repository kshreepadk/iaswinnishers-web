import { createClient } from "@supabase/supabase-js";

// This client uses the SERVICE ROLE key, which has full database access
// and bypasses row-level security. It must NEVER be imported into a
// "use client" component or anything that ships to the browser — only
// into API route handlers (src/app/api/**/route.js), which run on the
// server and are never sent to visitors.
export function getSupabaseServerClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables. " +
        "Add them to .env.local (for local development) and to your Vercel project's " +
        "Environment Variables (for production)."
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
