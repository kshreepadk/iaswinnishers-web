import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySessionToken, ADMIN_COOKIE_NAME } from "@/lib/adminAuth";

// This layout wraps every page inside src/app/admin/(protected)/ — the
// parentheses mean "(protected)" doesn't appear in the actual URL, so
// /admin/(protected)/leads still resolves to just /admin/leads.
//
// Deliberately NOT using Next.js Middleware (Edge Runtime) for this check.
// Middleware works great on Vercel, but its support is inconsistent across
// other Next.js hosts (including some newer "managed Node.js" platforms).
// A layout-level check like this runs as an ordinary Server Component on
// the standard Node.js runtime, which every real Next.js host supports —
// so this same code works unchanged on Vercel, Hostinger's Next.js
// hosting, or a plain VPS.
export default async function ProtectedAdminLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const valid = await verifySessionToken(token);

  if (!valid) {
    redirect("/admin/login");
  }

  return children;
}
