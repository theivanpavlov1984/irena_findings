import { NextResponse } from "next/server";
import { verifyTelegramLogin, createSessionValue, SESSION_COOKIE } from "../../../../lib/tgAuth";
import { supabaseAdmin } from "../../../../lib/supabase";

/**
 * Telegram Login Widget присылает пользователя сюда GET-запросом.
 * Проверяем подпись, создаём/находим клиента, ставим сессионную куку.
 */
export async function GET(request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const params = Object.fromEntries(new URL(request.url).searchParams.entries());

  const result = verifyTelegramLogin(params, token);
  if (!result.ok) {
    return NextResponse.redirect(new URL(`/account?error=${result.reason}`, request.url));
  }

  try {
    const db = supabaseAdmin();
    const { user } = result;

    // создаём клиента или обновляем данные, если он уже входил
    const { error } = await db
      .from("clients")
      .upsert(
        {
          tg_id: user.tg_id,
          tg_username: user.tg_username,
          first_name: user.first_name,
          photo_url: user.photo_url,
        },
        { onConflict: "tg_id" }
      )
      .select("id")
      .single();

    if (error) throw error;

    const response = NextResponse.redirect(new URL("/account", request.url));
    response.cookies.set(SESSION_COOKIE, createSessionValue(user.tg_id, token), {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    return response;
  } catch (e) {
    console.error("telegram auth failed:", e.message);
    return NextResponse.redirect(new URL("/account?error=server", request.url));
  }
}
