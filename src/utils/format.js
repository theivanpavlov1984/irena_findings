/**
 * Цена лота. По умолчанию рубли; для часов цена указывается в долларах,
 * оплата — в рублях по курсу ЦБ на день оплаты.
 */
export const fmt = (n, currency = "RUB") => {
  if (n == null) return "Цена по запросу";
  const num = new Intl.NumberFormat("ru-RU").format(n);
  return currency === "USD" ? "$" + num : num + " \u20bd";
};
