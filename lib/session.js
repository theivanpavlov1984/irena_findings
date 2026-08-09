import crypto from "node:crypto";

/**
 * Сессия клиента после входа по коду из письма.
 *
 * Кука хранит id клиента и подпись. Подпись считается секретом,
 * который есть только на сервере, поэтому подделать куку нельзя.
 */

export const SESSION_COOKIE = "irena_session";
const MAX_AGE_SEC = 60 * 60 * 24 * 30; // 30 дней

function secret() {
  const s = process.env.SESSION_SECRET || process.env.SUPABASE_SERVICE_KEY;
  if (!s) throw new Error("Не задан SESSION_SECRET");
  return s;
}

function sign(value) {
  return crypto.createHmac("sha256", secret()).update(value).digest("hex");
}

export function createSession(clientId) {
  const payload = `${clientId}.${Math.floor(Date.now() / 1000)}`;
  return `${payload}.${sign(payload)}`;
}

/** @returns {number|null} id клиента, если кука валидна */
export function readSession(cookieValue) {
  if (!cookieValue) return null;

  const parts = String(cookieValue).split(".");
  if (parts.length !== 3) return null;

  const [clientId, issuedAt, sig] = parts;
  const expected = sign(`${clientId}.${issuedAt}`);

  const a = Buffer.from(expected, "hex");
  const b = Buffer.from(sig, "hex");
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  if (Date.now() / 1000 - Number(issuedAt) > MAX_AGE_SEC) return null;

  return Number(clientId);
}

export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  path: "/",
  maxAge: MAX_AGE_SEC,
};

/** Простая проверка адреса — до отправки письма. */
export function isValidEmail(value) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}
