// Sends a WhatsApp message to YOU (the site owner) whenever a form is
// submitted — a real-time alert, not a message to the customer.
//
// Uses CallMeBot (callmebot.com) — a small, free, community-run service,
// not Meta's official WhatsApp Business API. This is a deliberate choice:
// the official API requires business verification and pre-approved
// message templates, which can take days to set up. CallMeBot works
// immediately, at the cost of being an unofficial, best-effort service —
// fine for an internal alert to yourself, but not something to build
// customer-facing messaging on. See the README for the official upgrade
// path if you ever want two-way WhatsApp with aspirants themselves.

function friendlySource(source) {
  if (!source) return "Unknown";
  if (source === "contact-form") return "Contact Form";
  if (source === "blog-newsletter") return "Blog Newsletter";
  if (source.startsWith("resources-")) {
    return "Resource download: " + source.replace("resources-", "").replace(/-/g, " ");
  }
  return source;
}

export async function sendWhatsAppNotification({ name, email, phone, stage, message, source }) {
  const notifyPhone = process.env.WHATSAPP_NOTIFY_PHONE;
  const apiKey = process.env.WHATSAPP_APIKEY;

  if (!notifyPhone || !apiKey) {
    console.error("WHATSAPP_NOTIFY_PHONE or WHATSAPP_APIKEY not set — skipping WhatsApp notification.");
    return { skipped: true };
  }

  const lines = [
    "New website submission",
    "",
    `Source: ${friendlySource(source)}`,
    `Name: ${name || "—"}`,
  ];
  if (email) lines.push(`Email: ${email}`);
  if (phone) lines.push(`Phone: ${phone}`);
  if (stage) lines.push(`Stage: ${stage}`);
  if (message) lines.push(`Message: ${message}`);

  const text = lines.join("\n");
  const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(
    notifyPhone
  )}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(apiKey)}`;

  try {
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("CallMeBot WhatsApp request failed:", res.status, body);
      return { error: true };
    }
    return { ok: true };
  } catch (err) {
    console.error("CallMeBot WhatsApp request threw:", err);
    return { error: true };
  }
}
