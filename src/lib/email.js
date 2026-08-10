import { Resend } from "resend";

// Server-only — never import this into a "use client" component.
// The site's own URL is needed to build a working download link inside
// the email (e.g. https://iaswinnishers.com/resources/ncert-booklist.pdf).
// Set SITE_URL in your environment once you have a real domain; until
// then it falls back to your Vercel .vercel.app URL if you set that
// instead, or to localhost for local testing.
const SITE_URL = process.env.SITE_URL || "http://localhost:3000";

export async function sendResourceEmail({ to, name, resource }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — skipping email send.");
    return { skipped: true };
  }

  const resend = new Resend(apiKey);
  const downloadUrl = `${SITE_URL}${resource.file}`;
  const firstName = (name || "there").split(" ")[0];

  const { error } = await resend.emails.send({
    // resend.dev works immediately with no setup for getting started.
    // Once you verify your own domain in Resend, change this to
    // something like "IAS Winnishers <hello@iaswinnishers.com>".
    from: "IAS Winnishers <onboarding@resend.dev>",
    to,
    subject: `Your download: ${resource.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #26180F;">
        <h2 style="color:#26180F;">Hi ${firstName},</h2>
        <p>Here's your copy of <strong>${resource.title}</strong> — ${resource.blurb}.</p>
        <p style="margin: 24px 0;">
          <a href="${downloadUrl}" style="background:#FF5A36;color:#fff;padding:12px 24px;border-radius:999px;text-decoration:none;font-weight:bold;display:inline-block;">
            Download Your PDF
          </a>
        </p>
        <p>If the button doesn't work, copy this link into your browser:<br>
          <a href="${downloadUrl}">${downloadUrl}</a>
        </p>
        <p style="margin-top:32px;">Whenever you're ready to talk to a coach, we're here:
          <a href="${SITE_URL}/contact#counselling">Book a free counselling call</a>.
        </p>
        <p style="color:#9A8B78;font-size:13px;margin-top:32px;">— IAS Winnishers<br>An Institute for Winning Finish in IAS Exam</p>
      </div>
    `,
  });

  if (error) {
    console.error("Resend send error:", error);
    return { error };
  }
  return { ok: true };
}
