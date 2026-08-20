import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabase";
import { isValidEmail } from "../../../../lib/session";
import { rateLimit, clientIp } from "../../../../lib/rateLimit";

/** Шаг 1: клиент вводит почту — Supabase отправляет письмо с кодом. */
export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Проверьте адрес почты" }, { status: 400 });
    }

    const mail = email.trim().toLowerCase();

    // Свои ограничения — чтобы через форму нельзя было рассылать письма.
    // На один адрес: 3 письма в час. С одного IP: 10 писем в час.
    const byEmail = rateLimit(`mail:${mail}`, 3, 3_600_000);
    if (!byEmail.ok) {
      return NextResponse.json(
        { error: "Мы уже отправили код на этот адрес. Проверьте почту, включая «Спам»." },
        { status: 429, headers: { "Retry-After": String(byEmail.retryAfter) } }
      );
    }

    const byIp = rateLimit(`ip:${clientIp(request)}`, 10, 3_600_000);
    if (!byIp.ok) {
      return NextResponse.json(
        { error: "Слишком много попыток. Попробуйте позже." },
        { status: 429, headers: { "Retry-After": String(byIp.retryAfter) } }
      );
    }

    const db = supabaseAdmin();
    const { error } = await db.auth.signInWithOtp({
      email: mail,
      options: { shouldCreateUser: true },
    });

    if (error) {
      const tooMany = /rate|limit|seconds/i.test(error.message || "");
      return NextResponse.json(
        {
          error: tooMany
            ? "Слишком много попыток. Попробуйте через минуту."
            : "Не удалось отправить письмо. Попробуйте позже.",
        },
        { status: tooMany ? 429 : 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("send-code failed:", e.message);
    return NextResponse.json({ error: "Не удалось отправить письмо" }, { status: 500 });
  }
}
