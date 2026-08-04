export const fmt = (n) =>
  n == null ? "Цена по запросу" : new Intl.NumberFormat("ru-RU").format(n) + " \u20bd";
