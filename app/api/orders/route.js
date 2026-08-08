import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readSessionValue, SESSION_COOKIE } from "../../../lib/tgAuth";
import { supabaseAdmin } from "../../../lib/supabase";

/**
 * Возвращает заявки ТОЛЬКО того клиента, чья сессия в куке.
 * Куку подделать нельзя — она подписана токеном бота.
 */
export async function GET() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const raw = cookies().get(SESSION_COOKIE)?.value;
  const tgId = readSessionValue(raw, token);

  if (!tgId) return NextResponse.json({ user: null, orders: [] });

  try {
    const db = supabaseAdmin();

    const { data: client } = await db
      .from("clients")
      .select("id, tg_username, first_name, photo_url")
      .eq("tg_id", tgId)
      .single();

    if (!client) return NextResponse.json({ user: null, orders: [] });

    const { data: orders, error } = await db
      .from("orders")
      .select("id, lot_id, title, price, status, note, created_at, updated_at")
      .eq("client_id", client.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({
      user: {
        name: client.first_name || client.tg_username || "Клиент",
        username: client.tg_username,
        photo: client.photo_url,
      },
      orders: orders || [],
    });
  } catch (e) {
    console.error("orders fetch failed:", e.message);
    return NextResponse.json({ user: null, orders: [], error: "server" }, { status: 500 });
  }
}
