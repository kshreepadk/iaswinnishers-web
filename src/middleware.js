import { NextResponse } from "next/server";
import { verifySessionToken, ADMIN_COOKIE_NAME } from "@/lib/adminAuth";

export const config = {
  matcher: ["/admin/:path*", "/api/admin/leads/:path*"],
};

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // The login page itself must stay reachable without a valid session —
  // otherwise nobody could ever log in in the first place.
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const valid = await verifySessionToken(token);

  if (!valid) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}
