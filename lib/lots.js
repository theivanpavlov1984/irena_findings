import fs from "node:fs";
import path from "node:path";

const DIR = path.join(process.cwd(), "src", "data", "lots");

export function getLots() {
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".json"));
  return files
    .map((f) => JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")))
    .sort((a, b) => {
      // 1) ручной порядок: меньше число — выше
      const ao = a.order ?? 100,
        bo = b.order ?? 100;
      if (ao !== bo) return ao - bo;
      // 2) при равном порядке — новее сверху (по дате добавления)
      const ad = a.addedAt || "",
        bd = b.addedAt || "";
      if (ad !== bd) return bd.localeCompare(ad);
      // 3) стабильный добор
      return String(a.id).localeCompare(String(b.id));
    })
    .map((l) => ({
      ...l,
      metal: (l.specs && l.specs.metal) || "",
      movement: (l.specs && l.specs.movement) || "",
    }));
}

export function getLot(id) {
  return getLots().find((l) => l.id === id) || null;
}

export function fmtPrice(p, currency = "RUB") {
  if (p == null) return "Цена по запросу";
  const num = new Intl.NumberFormat("ru-RU").format(p);
  return currency === "USD" ? "$" + num : num + " ₽";
}
