import { notFound } from "next/navigation";
import Store from "../../../src/IrenaStore.jsx";
import { getLots, getLot, fmtPrice } from "../../../lib/lots.js";
import { SITE } from "../../../lib/site.js";

export function generateStaticParams() {
  return getLots().map((l) => ({ id: l.id }));
}

function plain(lot) {
  const first = (lot.desc || "").split("\n\n")[0] || "";
  const cond = lot.conditionNote || lot.condition || "";
  const base = first.length > 20 ? first : [lot.brand, lot.model, cond].filter(Boolean).join(". ");
  const text = `${base} ${fmtPrice(lot.price)}.`.replace(/\s+/g, " ").trim();
  return text.length > 300 ? text.slice(0, 297).trimEnd() + "…" : text;
}

export function generateMetadata({ params }) {
  const lot = getLot(params.id);
  if (!lot) return { title: "Лот не найден — Irena | Находки" };
  const title = `${lot.brand} ${lot.model} — ${fmtPrice(lot.price)} | Irena · Находки`;
  const description = plain(lot);
  const photo = (lot.photos && lot.photos[0]) || null;
  return {
    title,
    description,
    alternates: { canonical: `/lot/${lot.id}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/lot/${lot.id}`,
      images: photo ? [{ url: photo, width: 900, height: 900, alt: `${lot.brand} ${lot.model}` }] : [],
    },
    twitter: { card: "summary_large_image", title, description, images: photo ? [photo] : [] },
  };
}

export default function LotPage({ params }) {
  const lots = getLots();
  const lot = lots.find((l) => l.id === params.id);
  if (!lot) notFound();

  const catLabel = lot.cat === "bags" ? "Сумки" : "Украшения";
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE + "/" },
      { "@type": "ListItem", position: 2, name: catLabel, item: SITE + "/catalog/" + lot.cat },
      { "@type": "ListItem", position: 3, name: lot.brand, item: SITE + "/catalog/" + lot.cat + "?brand=" + encodeURIComponent(lot.brand) },
      { "@type": "ListItem", position: 4, name: lot.model, item: SITE + "/lot/" + lot.id },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <Store lots={lots} initialView="catalog" initialCat={lot.cat} initialLot={lot} />
    </>
  );
}
