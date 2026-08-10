"use client";

import { useState } from "react";
import Confetti from "@/components/Confetti";

export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const [celebrate, setCelebrate] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.target;
    const payload = {
      name: form.name.value,
      phone: form.phone.value,
      email: form.email.value,
      stage: form.stage.value,
      message: form.msg.value,
      source: "contact-form",
      website: form.website.value, // honeypot, should always be empty
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
      setCelebrate(true);
      form.reset();
    } catch {
      setErrorMessage("Couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-md2 border border-leaf-light bg-leaf-light p-6 text-center">
        <Confetti fire={celebrate} onDone={() => setCelebrate(false)} />
        <p className="font-display text-lg font-semibold text-ink">Thanks — you&apos;re booked in!</p>
        <p className="mt-2 text-sm text-ink-2">
          A coach will reach out shortly to confirm a time for your call.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      {/* Honeypot field — hidden from real users via CSS, bots often fill it in anyway */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <div>
        <label className="field-label" htmlFor="name">Full name</label>
        <input id="name" name="name" type="text" required placeholder="Your full name" className="field-input" />
      </div>
      <div>
        <label className="field-label" htmlFor="phone">Phone number</label>
        <input id="phone" name="phone" type="tel" required placeholder="+91 " className="field-input" />
      </div>
      <div>
        <label className="field-label" htmlFor="email">Email address</label>
        <input id="email" name="email" type="email" required placeholder="you@email.com" className="field-input" />
      </div>
      <div>
        <label className="field-label" htmlFor="stage">Current stage</label>
        <select id="stage" name="stage" className="field-input">
          <option>Just starting out</option>
          <option>Preparing for Prelims</option>
          <option>Preparing for Mains</option>
          <option>Preparing for Interview</option>
          <option>Repeating / reassessing strategy</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className="field-label" htmlFor="msg">Anything you&apos;d like your coach to know?</label>
        <textarea id="msg" name="msg" rows={3} placeholder="Optional" className="field-input" />
      </div>

      {status === "error" && (
        <p className="sm:col-span-2 text-sm font-semibold text-coral-dark">{errorMessage}</p>
      )}

      <button type="submit" disabled={status === "loading"} className="btn btn-primary sm:col-span-2 disabled:opacity-60">
        {status === "loading" ? "Sending…" : "Book My Free Call"}
      </button>
    </form>
  );
}
