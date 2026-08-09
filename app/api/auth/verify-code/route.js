import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabase";
import { createSession, isValidEmail, SESSION_COOKIE, SESSION_COOKIE_OPTIONS } from "../../../../lib/session";

/** Шаг 2: клиент вводит код из письма — проверяем и открываем сессию. */
export async function POST(request) {
  try {
    const { email, code } = await request.json();

    if (!isValidEmail(email) || !/^\d{6}$/.test(String(code || "").trim())) {
      return NextResponse.json({ error: "Проверьте почту и код" }, { status: 400 });
    }

    const mail = email.trim().toLowerCase();
    const db = supabaseAdmin();

    const { data, error } = await db.auth.verifyOtp({
      email: mail,
      token: String(code).trim(),
      type: "email",
    });

    if (error || !data?.user) {
      return NextResponse.json({ error: "Неверный или устаревший код" }, { status: 401 });
    }

    // создаём или находим клиента в нашей таблице
    const { data: client, error: dbError } = await db
      .from("clients")
      .upsert({ email: mail }, { onConflict: "email" })
      .select("id")
      .single();

    if (dbError) throw dbError;

    const response = NextResponse.json({ ok: true });
    response.cookies.set(SESSION_COOKIE, createSession(client.id), SESSION_COOKIE_OPTIONS);
    return response;
  } catch (e) {
    console.error("verify-code failed:", e.message);
    return NextResponse.json({ error: "Не удалось войти" }, { status: 500 });
  }
}
