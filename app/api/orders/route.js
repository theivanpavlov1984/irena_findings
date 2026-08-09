import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readSession, SESSION_COOKIE } from "../../../lib/session";
import { supabaseAdmin } from "../../../lib/supabase";

/** Заявки только того клиента, чья сессия в куке. */
export async function GET() {
  const clientId = readSession(cookies().get(SESSION_COOKIE)?.value);
  if (!clientId) return NextResponse.json({ user: null, orders: [] });

  try {
    const db = supabaseAdmin();

    const { data: client } = await db
      .from("clients")
      .select("id, email, first_name")
      .eq("id", clientId)
      .single();

    if (!client) return NextResponse.json({ user: null, orders: [] });

    const { data: orders, error } = await db
      .from("orders")
      .select("id, lot_id, title, price, status, note, created_at, updated_at")
      .eq("client_id", client.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({
      user: { name: client.first_name || client.email, email: client.email },
      orders: orders || [],
    });
  } catch (e) {
    console.error("orders fetch failed:", e.message);
    return NextResponse.json({ user: null, orders: [], error: "server" }, { status: 500 });
  }
}
