"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setLoading(false);
        return;
      }

      router.push("/admin/leads");
      router.refresh();
    } catch {
      setError("Couldn't reach the server.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-6">
      <div className="w-full max-w-[380px] rounded-lg2 border border-line bg-white p-8">
        <h1 className="mb-1 font-display text-xl font-semibold text-ink">Admin Login</h1>
        <p className="mb-6 text-sm text-ink-2">IAS Winnishers — Leads Dashboard</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="field-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="field-input"
            />
          </div>
          {error && <p className="text-sm font-semibold text-coral-dark">{error}</p>}
          <button type="submit" disabled={loading} className="btn btn-primary disabled:opacity-60">
            {loading ? "Checking…" : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}
