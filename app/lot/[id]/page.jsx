import { notFound } from "next/navigation";
import Store from "../../../src/IrenaStore.jsx";
import { getLots, getLot, fmtPrice } from "../../../lib/lots.js";

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
  return <Store lots={lots} initialView="catalog" initialCat={lot.cat} initialLot={lot} />;
}
