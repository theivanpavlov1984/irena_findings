import { getLots } from "../lib/lots.js";
import { SITE } from "../lib/site.js";

export default function sitemap() {
  const now = new Date();
  const pages = ["/", "/catalog/bags", "/catalog/jewelry", "/authenticity"];
  const lots = getLots().map((l) => "/lot/" + l.id);
  return [...pages, ...lots].map((p) => ({ url: SITE + p, lastModified: now }));
}
