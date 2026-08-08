import { createClient } from "@supabase/supabase-js";

/**
 * Серверный клиент Supabase.
 *
 * Использует секретный ключ, поэтому обходит RLS — значит вызывать его можно
 * ТОЛЬКО в серверном коде (route handlers, серверные компоненты).
 * В браузер этот модуль попадать не должен.
 */
export function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;

  if (!url || !key) {
    throw new Error(
      "Не заданы переменные окружения NEXT_PUBLIC_SUPABASE_URL и SUPABASE_SERVICE_KEY"
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
