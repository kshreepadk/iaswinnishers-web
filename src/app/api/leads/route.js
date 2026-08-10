import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { getResource } from "@/lib/resources";
import { sendResourceEmail } from "@/lib/email";

// Very small, dependency-free email format check — good enough to catch
// obvious mistakes without pulling in a validation library for one field.
function isValidEmail(value) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const {
    name,
    email,
    phone,
    stage,
    message,
    source, // e.g. "contact-form", "resources-ncert-booklist", "blog-subscribe"
    website, // honeypot field — real users never fill this in; bots often do
  } = body || {};

  // Honeypot spam check: if this hidden field has anything in it, silently
  // pretend success so the bot moves on, without touching the database.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!name || typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!email && !phone) {
    return NextResponse.json({ error: "An email or phone number is required." }, { status: 400 });
  }
  if (email && !isValidEmail(email)) {
    return NextResponse.json({ error: "That email address doesn't look right." }, { status: 400 });
  }

  try {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from("leads").insert({
      name: name.trim(),
      email: email ? email.trim() : null,
      phone: phone ? phone.trim() : null,
      stage: stage || null,
      message: message || null,
      source: source || "unknown",
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Something went wrong saving your details. Please try again." }, { status: 500 });
    }

    // If this submission came from a resource card (source is
    // "resources-<slug>", e.g. "resources-ncert-booklist"), automatically
    // email the matching PDF. Any other source (contact-form,
    // blog-newsletter, etc.) just saves the lead as before — no email sent
    // since there's no file to attach.
    if (email && source && source.startsWith("resources-")) {
      const slug = source.replace("resources-", "");
      const resource = getResource(slug);
      if (resource) {
        // Don't let an email failure break the form submission itself —
        // the lead is already safely saved either way.
        const result = await sendResourceEmail({ to: email, name, resource });
        if (result.error) {
          return NextResponse.json({
            ok: true,
            warning: "Saved, but the email couldn't be sent. We'll follow up directly.",
          });
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead submission error:", err);
    return NextResponse.json(
      { error: "The server isn't configured correctly yet. Please contact us directly for now." },
      { status: 500 }
    );
  }
}
