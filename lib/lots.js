import fs from "node:fs";
import path from "node:path";

const DIR = path.join(process.cwd(), "src", "data", "lots");

export function getLots() {
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".json"));
  return files
    .map((f) => JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")))
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map((l) => ({ ...l, metal: (l.specs && l.specs.metal) || "" }));
}

export function getLot(id) {
  return getLots().find((l) => l.id === id) || null;
}

export function fmtPrice(p) {
  return p == null ? "Цена по запросу" : new Intl.NumberFormat("ru-RU").format(p) + " ₽";
}
