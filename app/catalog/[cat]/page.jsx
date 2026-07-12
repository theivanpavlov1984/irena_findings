import Store from "../../../src/IrenaStore.jsx";
import { getLots } from "../../../lib/lots.js";

export function generateStaticParams() {
  return [{ cat: "bags" }, { cat: "jewelry" }];
}

export function generateMetadata({ params }) {
  const isBags = params.cat === "bags";
  const title = isBags ? "Сумки — Irena | Находки" : "Украшения — Irena | Находки";
  const description = isBags
    ? "Премиальные сумки с подтверждённой подлинностью: Hermès, Chanel, Louis Vuitton, Bottega Veneta и другие."
    : "Украшения с подтверждённой подлинностью: Cartier, Van Cleef & Arpels, Bulgari, Tiffany, Graff.";
  return { title, description, openGraph: { title, description } };
}

export default function CatalogPage({ params }) {
  const cat = params.cat === "jewelry" ? "jewelry" : "bags";
  return <Store lots={getLots()} initialView="catalog" initialCat={cat} />;
}
