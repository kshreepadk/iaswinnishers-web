"use client";

import { useState, useRef } from "react";

export default function LeadForm({ buttonLabel = "Get it now", source = "unknown", downloadUrl }) {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");
  const downloadLinkRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

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
        setMessage(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();

      // Auto-trigger the download the moment the lead is saved, so there's
      // no extra click needed — the visible button below is a fallback in
      // case the browser blocks the automatic click.
      if (downloadUrl) {
        setTimeout(() => downloadLinkRef.current?.click(), 150);
      }
    } catch {
      setMessage("Couldn't reach the server. Try again in a moment.");
      setStatus("error");
    }
  }

  if (status === "success") {
    if (!downloadUrl) {
      return (
        <p className="mt-1 text-sm font-semibold text-leaf">
          Thanks — you&apos;re on the list!
        </p>
      );
    }
    return (
      <div className="mt-1">
        <p className="mb-2 text-sm font-semibold text-leaf">Your download should start automatically.</p>
        <a
          ref={downloadLinkRef}
          href={downloadUrl}
          download
          className="btn btn-primary w-full !py-2.5 text-sm"
        >
          Didn&apos;t start? Click to download
        </a>
      </div>
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
      {status === "error" && <p className="w-full text-sm font-semibold text-coral-dark">{message}</p>}
      <button type="submit" disabled={status === "loading"} className="btn btn-primary w-full !py-2.5 text-sm disabled:opacity-60">
        {status === "loading" ? "Preparing…" : buttonLabel}
      </button>
    </form>
  );
}
