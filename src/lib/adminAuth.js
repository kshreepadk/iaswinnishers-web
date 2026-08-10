// Uses the Web Crypto API (crypto.subtle) deliberately, rather than
// Node's built-in `crypto` module — this file is imported by both
// ordinary API routes (Node runtime) AND middleware.js (Edge runtime),
// and Web Crypto is the one API that works in both.

export const ADMIN_COOKIE_NAME = "admin_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

async function getKey() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "ADMIN_SESSION_SECRET is not set. Add a long random string to .env.local (and to Vercel) — see .env.local.example."
    );
  }
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function toHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Creates a signed "admin:<expiry>.<signature>" token to store in a cookie. */
export async function createSessionToken() {
  const expires = Date.now() + SESSION_DURATION_MS;
  const payload = `admin:${expires}`;
  const key = await getKey();
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return `${payload}.${toHex(sig)}`;
}

/** Returns true only if the token is well-formed, unexpired, and correctly signed. */
export async function verifySessionToken(token) {
  if (!token || typeof token !== "string") return false;

  const dotIndex = token.lastIndexOf(".");
  if (dotIndex === -1) return false;
  const payload = token.slice(0, dotIndex);
  const sigHex = token.slice(dotIndex + 1);

  const expiresStr = payload.split(":")[1];
  const expires = Number(expiresStr);
  if (!expires || Number.isNaN(expires) || Date.now() > expires) return false;

  try {
    const key = await getKey();
    const expectedSig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
    return toHex(expectedSig) === sigHex;
  } catch {
    return false;
  }
}
