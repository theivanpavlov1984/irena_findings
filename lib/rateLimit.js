/**
 * Ограничение частоты запросов.
 *
 * Хранится в памяти процесса: перезапуск приложения сбрасывает счётчики.
 * Для одного сервера и нашего потока этого достаточно; при нескольких
 * серверах понадобилось бы общее хранилище (например, таблица в базе).
 */

const buckets = new Map();

/** Раз в 10 минут выбрасываем протухшие записи, чтобы не копить память. */
let lastSweep = Date.now();
function sweep(now) {
  if (now - lastSweep < 600_000) return;
  lastSweep = now;
  for (const [key, hits] of buckets) {
    const alive = hits.filter((t) => now - t < 3_600_000);
    if (alive.length) buckets.set(key, alive);
    else buckets.delete(key);
  }
}

/**
 * @param {string} key   что ограничиваем (адрес почты, IP)
 * @param {number} limit сколько попыток разрешено
 * @param {number} windowMs за какой промежуток
 * @returns {{ok: boolean, retryAfter: number}} retryAfter — секунды до следующей попытки
 */
export function rateLimit(key, limit, windowMs) {
  const now = Date.now();
  sweep(now);

  const hits = (buckets.get(key) || []).filter((t) => now - t < windowMs);

  if (hits.length >= limit) {
    const retryAfter = Math.ceil((windowMs - (now - hits[0])) / 1000);
    buckets.set(key, hits);
    return { ok: false, retryAfter };
  }

  hits.push(now);
  buckets.set(key, hits);
  return { ok: true, retryAfter: 0 };
}

/** IP клиента за прокси Timeweb / Vercel. */
export function clientIp(request) {
  const h = request.headers;
  return (
    h.get("x-real-ip") ||
    (h.get("x-forwarded-for") || "").split(",")[0].trim() ||
    "unknown"
  );
}
