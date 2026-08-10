import { getSupabaseServerClient } from "@/lib/supabaseServer";
import LeadsTable from "@/components/admin/LeadsTable";
import LogoutButton from "@/components/admin/LogoutButton";

// Always fetch fresh from Supabase — this page should never show a
// cached/stale list of leads.
export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const supabase = getSupabaseServerClient();
  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-paper px-6 py-10">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-semibold text-ink">Leads Dashboard</h1>
            <p className="text-sm text-ink-2">{leads?.length || 0} total submissions</p>
          </div>
          <LogoutButton />
        </div>

        {error && (
          <p className="rounded-md2 border border-coral bg-white p-4 text-sm text-coral-dark">
            Couldn&apos;t load leads: {error.message}
          </p>
        )}

        {!error && <LeadsTable initialLeads={leads || []} />}
      </div>
    </div>
  );
}
