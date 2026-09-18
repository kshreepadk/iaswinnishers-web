// Sends a WhatsApp message to YOU (and optionally a second person) whenever
// a form is submitted — a real-time alert, not a message to the customer.
//
// Uses CallMeBot (callmebot.com) — a small, free, community-run service,
// not Meta's official WhatsApp Business API. This is a deliberate choice:
// the official API requires business verification and pre-approved
// message templates, which can take days to set up. CallMeBot works
// immediately, at the cost of being an unofficial, best-effort service —
// fine for an internal alert to yourself, but not something to build
// customer-facing messaging on. See the README for the official upgrade
// path if you ever want two-way WhatsApp with aspirants themselves.
//
// CallMeBot ties each API key to one specific phone number, so a second
// recipient needs their own key (see the README) — that's why this reads
// two separate phone/key pairs instead of one list.

function friendlySource(source) {
  if (!source) return "Unknown";
  if (source === "contact-form") return "Contact Form";
  if (source === "blog-newsletter") return "Blog Newsletter";
  if (source.startsWith("resources-")) {
    return "Resource download: " + source.replace("resources-", "").replace(/-/g, " ");
  }
  return source;
}

async function sendToOne(phone, apiKey, text) {
  const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(
    phone
  )}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(apiKey)}`;

  try {
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(`CallMeBot WhatsApp request failed for ${phone}:`, res.status, body);
      return { error: true };
    }
    return { ok: true };
  } catch (err) {
    console.error(`CallMeBot WhatsApp request threw for ${phone}:`, err);
    return { error: true };
  }
}

export async function sendWhatsAppNotification({ name, email, phone, stage, message, source }) {
  const recipients = [
    { phone: process.env.WHATSAPP_NOTIFY_PHONE, key: process.env.WHATSAPP_APIKEY },
    { phone: process.env.WHATSAPP_NOTIFY_PHONE_2, key: process.env.WHATSAPP_APIKEY_2 },
  ].filter((r) => r.phone && r.key); // second recipient is optional

  if (recipients.length === 0) {
    console.error("No WhatsApp recipients configured — skipping notification.");
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

  // Sent one after another rather than in parallel — CallMeBot is a free
  // community service and can be sensitive to bursts of simultaneous
  // requests; two sequential calls a moment apart is safer than racing them.
  const results = [];
  for (const r of recipients) {
    results.push(await sendToOne(r.phone, r.key, text));
  }

  const anyOk = results.some((r) => r.ok);
  return anyOk ? { ok: true } : { error: true };
}
