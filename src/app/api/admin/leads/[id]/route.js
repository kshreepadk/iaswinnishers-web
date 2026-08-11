import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { verifySessionToken, ADMIN_COOKIE_NAME } from "@/lib/adminAuth";

const ALLOWED_STATUSES = ["new", "contacted", "enrolled", "not_interested"];

export async function PATCH(request, { params }) {
  // This route isn't covered by the protected layout (layouts only wrap
  // pages, not API routes), so it checks the session cookie itself.
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const valid = await verifySessionToken(token);
  if (!valid) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const updates = {};

  if (body.status !== undefined) {
    if (!ALLOWED_STATUSES.includes(body.status)) {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }
    updates.status = body.status;
  }
  if (body.notes !== undefined) {
    updates.notes = body.notes;
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "Nothing to update." }, { status: 400 });
  }

  try {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from("leads").update(updates).eq("id", id);
    if (error) {
      console.error("Lead update error:", error);
      return NextResponse.json({ error: "Couldn't save changes." }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
