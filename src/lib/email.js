import { Resend } from "resend";

// Server-only — never import this into a "use client" component.

export async function sendThankYouEmail({ to, name, resourceTitle }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — skipping thank-you email.");
    return { skipped: true };
  }

  const resend = new Resend(apiKey);
  const firstName = (name || "there").split(" ")[0];

  const { error } = await resend.emails.send({
    // resend.dev works immediately with no setup for getting started.
    // Once you verify your own domain in Resend, change this to
    // something like "IAS Winnishers <hello@iaswinnishers.com>" — an
    // unverified sending domain can land in spam more often.
    from: "IAS Winnishers <onboarding@resend.dev>",
    to,
    subject: "Thanks for downloading — here's how to reach us",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #26180F;">
        <h2 style="color:#26180F;">Hi ${firstName},</h2>
        <p>Thanks for downloading <strong>${resourceTitle}</strong> — we hope it's genuinely useful for your preparation.</p>
        <p>If anything comes up — questions about the resource, your prep in general, or you'd just like to talk through where you stand — we're easy to reach:</p>
        <ul style="padding-left:18px;color:#26180F;">
          <li>Phone / WhatsApp: <a href="tel:+919886273325">+91 98862 73325</a></li>
          <li>Email: <a href="mailto:vinayenterprising@gmail.com">vinayenterprising@gmail.com</a></li>
        </ul>
        <p style="margin: 24px 0;">
          <a href="https://iaswinnishers.com/contact#counselling" style="background:#FF5A36;color:#fff;padding:12px 24px;border-radius:999px;text-decoration:none;font-weight:bold;display:inline-block;">
            Book a Free Counselling Call
          </a>
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
