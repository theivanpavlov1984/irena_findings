import { SITE } from "../lib/site.js";

export default function robots() {
  return { rules: [{ userAgent: "*", allow: "/", disallow: "/account" }], sitemap: SITE + "/sitemap.xml" };
}
