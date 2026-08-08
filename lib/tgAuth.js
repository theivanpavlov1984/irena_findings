import crypto from "node:crypto";

/**
 * Проверка данных Telegram Login Widget.
 *
 * Telegram присылает поля пользователя и hash. Подпись считается так:
 *   secret = SHA256(bot_token)
 *   hash   = HMAC_SHA256(secret, "key=value\n..." отсортированные по ключу)
 *
 * Без токена бота подделать hash нельзя — поэтому проверка возможна
 * только на сервере.
 *
 * @returns {{ok: true, user: object} | {ok: false, reason: string}}
 */
export function verifyTelegramLogin(query, botToken) {
  if (!botToken) return { ok: false, reason: "no_token" };

  const { hash, ...fields } = query;
  if (!hash) return { ok: false, reason: "no_hash" };

  const checkString = Object.keys(fields)
    .filter((k) => fields[k] !== undefined && fields[k] !== null)
    .sort()
    .map((k) => `${k}=${fields[k]}`)
    .join("\n");

  const secret = crypto.createHash("sha256").update(botToken).digest();
  const expected = crypto.createHmac("sha256", secret).update(checkString).digest("hex");

  // сравнение с защитой от timing-атак
  const a = Buffer.from(expected, "hex");
  const b = Buffer.from(String(hash), "hex");
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return { ok: false, reason: "bad_signature" };
  }

  // данные не должны быть старше суток — защита от повторного использования ссылки
  const authDate = Number(fields.auth_date || 0);
  if (!authDate || Date.now() / 1000 - authDate > 86400) {
    return { ok: false, reason: "expired" };
  }

  return {
    ok: true,
    user: {
      tg_id: Number(fields.id),
      tg_username: fields.username || null,
      first_name: fields.first_name || null,
      photo_url: fields.photo_url || null,
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Сессия: подписанная кука вида "<tg_id>.<подпись>"                  */
/*  Клиент не может её подделать, не зная токен бота.                  */
/* ------------------------------------------------------------------ */

export const SESSION_COOKIE = "irena_session";

function sign(value, secret) {
  return crypto.createHmac("sha256", secret).update(value).digest("hex");
}

export function createSessionValue(tgId, secret) {
  const payload = `${tgId}.${Math.floor(Date.now() / 1000)}`;
  return `${payload}.${sign(payload, secret)}`;
}

export function readSessionValue(cookieValue, secret, maxAgeSec = 60 * 60 * 24 * 30) {
  if (!cookieValue || !secret) return null;
  const parts = String(cookieValue).split(".");
  if (parts.length !== 3) return null;

  const [tgId, issuedAt, sig] = parts;
  const payload = `${tgId}.${issuedAt}`;
  const expected = sign(payload, secret);

  const a = Buffer.from(expected, "hex");
  const b = Buffer.from(sig, "hex");
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  if (Date.now() / 1000 - Number(issuedAt) > maxAgeSec) return null;

  return Number(tgId);
}
