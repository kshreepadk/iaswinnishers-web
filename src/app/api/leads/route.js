import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { sendThankYouEmail } from "@/lib/email";
import { sendWhatsAppNotification } from "@/lib/whatsapp";

// Human-readable titles for the thank-you email, keyed by the resource
// slug used in `source` (e.g. "resources-ncert-booklist"). Keep this in
// sync with the RESOURCES array in src/app/resources/page.jsx.
const RESOURCE_TITLES = {
  "ncert-booklist": "The NCERT Booklist, Prioritized",
  "pyqs-topic-wise": "5 Years of PYQs, Topic-Wise",
  "syllabus-map": "The UPSC Syllabus, on One Page",
};

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
    source, // e.g. "contact-form", "resources-ncert-booklist", "blog-newsletter"
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

    // WhatsApp notification to you (the site owner) — for every form
    // submission, not just resource downloads. Awaited for the same
    // reliability reason as the thank-you email below: serverless
    // functions can be frozen right after the response is sent, which
    // would silently kill an un-awaited request mid-flight. A failed
    // notification never blocks or fails the response — the lead is
    // already safely saved regardless.
    try {
      await sendWhatsAppNotification({ name, email, phone, stage, message, source });
    } catch (err) {
      console.error("WhatsApp notification failed:", err);
    }

    // Resource downloads happen instantly on the page itself (see
    // LeadForm.jsx) — but for resource requests specifically (not the
    // Contact form or newsletter), we also send a short thank-you email
    // with how to reach us. This is awaited (not fire-and-forget) because
    // serverless functions can be frozen right after the response is
    // sent, which would silently kill an un-awaited email mid-flight. A
    // failed email still never blocks or fails the response itself — the
    // lead is already safely saved, and the download has already started
    // regardless of what happens here.
    if (email && source && source.startsWith("resources-")) {
      const slug = source.replace("resources-", "");
      const resourceTitle = RESOURCE_TITLES[slug];
      if (resourceTitle) {
        try {
          await sendThankYouEmail({ to: email, name, resourceTitle });
        } catch (err) {
          console.error("Thank-you email failed:", err);
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
