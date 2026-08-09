import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabase";
import { isValidEmail } from "../../../../lib/session";

/** Шаг 1: клиент вводит почту — Supabase отправляет письмо с кодом. */
export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Проверьте адрес почты" }, { status: 400 });
    }

    const db = supabaseAdmin();
    const { error } = await db.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: { shouldCreateUser: true },
    });

    if (error) {
      // частый случай — превышен лимит писем
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
