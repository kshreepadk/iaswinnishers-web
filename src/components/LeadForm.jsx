"use client";

import { useState } from "react";

export default function LeadForm({ buttonLabel = "Send it to me", source = "unknown" }) {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.target;
    const payload = {
      name: form.name.value,
      email: form.email.value,
      source,
      website: form.website.value, // honeypot
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setErrorMessage("Couldn't reach the server. Try again in a moment.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="mt-1 text-sm font-semibold text-leaf">
        Thanks! Check your inbox in the next few minutes.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-1 flex flex-wrap gap-2.5">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />
      <input type="text" name="name" placeholder="Your name" required className="field-input flex-1 !rounded-full" />
      <input type="email" name="email" placeholder="Email address" required className="field-input flex-1 !rounded-full" />
      {status === "error" && <p className="w-full text-sm font-semibold text-coral-dark">{errorMessage}</p>}
      <button type="submit" disabled={status === "loading"} className="btn btn-primary w-full !py-2.5 text-sm disabled:opacity-60">
        {status === "loading" ? "Sending…" : buttonLabel}
      </button>
    </form>
  );
}
