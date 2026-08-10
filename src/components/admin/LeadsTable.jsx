"use client";

import { useState, useMemo } from "react";

const STATUS_OPTIONS = [
  { value: "new", label: "New", color: "bg-marigold text-ink" },
  { value: "contacted", label: "Contacted", color: "bg-coral text-white" },
  { value: "enrolled", label: "Enrolled", color: "bg-leaf text-white" },
  { value: "not_interested", label: "Not Interested", color: "bg-ink/15 text-ink" },
];

function statusMeta(value) {
  return STATUS_OPTIONS.find((s) => s.value === value) || STATUS_OPTIONS[0];
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return iso;
  }
}

function friendlySource(source) {
  if (!source) return "—";
  if (source.startsWith("resources-")) {
    return "Resource: " + source.replace("resources-", "").replace(/-/g, " ");
  }
  const map = { "contact-form": "Contact Form", "blog-newsletter": "Blog Newsletter" };
  return map[source] || source;
}

export default function LeadsTable({ initialLeads }) {
  const [leads, setLeads] = useState(initialLeads);
  const [filter, setFilter] = useState("all");
  const [savingId, setSavingId] = useState(null);

  const filtered = useMemo(() => {
    if (filter === "all") return leads;
    return leads.filter((l) => (l.status || "new") === filter);
  }, [leads, filter]);

  const counts = useMemo(() => {
    const c = { all: leads.length, new: 0, contacted: 0, enrolled: 0, not_interested: 0 };
    leads.forEach((l) => {
      const s = l.status || "new";
      c[s] = (c[s] || 0) + 1;
    });
    return c;
  }, [leads]);

  async function updateLead(id, updates) {
    setSavingId(id);
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...updates } : l)));
    try {
      await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
    } finally {
      setSavingId(null);
    }
  }

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2">
        {[{ value: "all", label: "All" }, ...STATUS_OPTIONS].map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
              filter === opt.value
                ? "border-ink bg-ink text-white"
                : "border-line bg-white text-ink-2 hover:border-ink"
            }`}
          >
            {opt.label} ({counts[opt.value] || 0})
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-md2 border border-line bg-white">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b border-line bg-paper-2 text-xs font-semibold uppercase tracking-wide text-ink-2">
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Stage</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Notes</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead) => (
              <tr key={lead.id} className="border-b border-line align-top last:border-0">
                <td className="whitespace-nowrap px-4 py-3 text-ink-2">{formatDate(lead.created_at)}</td>
                <td className="px-4 py-3 font-semibold text-ink">{lead.name}</td>
                <td className="px-4 py-3 text-ink-2">
                  {lead.email && <div>{lead.email}</div>}
                  {lead.phone && <div>{lead.phone}</div>}
                </td>
                <td className="px-4 py-3 text-ink-2">{friendlySource(lead.source)}</td>
                <td className="px-4 py-3 text-ink-2">{lead.stage || "—"}</td>
                <td className="px-4 py-3">
                  <select
                    value={lead.status || "new"}
                    onChange={(e) => updateLead(lead.id, { status: e.target.value })}
                    className={`rounded-full border-0 px-3 py-1 text-xs font-semibold ${statusMeta(lead.status || "new").color}`}
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  {savingId === lead.id && <span className="ml-2 text-[10px] text-ink-2">saving…</span>}
                </td>
                <td className="px-4 py-3">
                  <textarea
                    defaultValue={lead.notes || ""}
                    onBlur={(e) => {
                      if (e.target.value !== (lead.notes || "")) {
                        updateLead(lead.id, { notes: e.target.value });
                      }
                    }}
                    rows={2}
                    placeholder="Add a note…"
                    className="w-[200px] rounded-[8px] border border-line bg-paper px-2 py-1.5 text-xs focus:border-coral focus:outline-none"
                  />
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-ink-2">No leads in this view yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
