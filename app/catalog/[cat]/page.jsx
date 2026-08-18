import Store from "../../../src/IrenaStore.jsx";
import { getLots } from "../../../lib/lots.js";

export function generateStaticParams() {
  return [{ cat: "bags" }, { cat: "jewelry" }, { cat: "watches" }];
}

export function generateMetadata({ params }) {
  const META = {
    bags: {
      title: "Сумки — Irena | Находки",
      description:
        "Премиальные сумки с подтверждённой подлинностью: Hermès, Chanel, Louis Vuitton, Bottega Veneta и другие.",
    },
    jewelry: {
      title: "Украшения — Irena | Находки",
      description:
        "Украшения с подтверждённой подлинностью: Cartier, Van Cleef & Arpels, Bulgari, Tiffany, Graff.",
    },
    watches: {
      title: "Часы — Irena | Находки",
      description:
        "Часы под заказ с проверкой механизма и подлинности в московском часовом сервисе: Cartier, Rolex, Omega, Piaget.",
    },
  };
  const { title, description } = META[params.cat] || META.bags;
  return { title, description, openGraph: { title, description } };
}

export default function CatalogPage({ params }) {
  const cat = ["jewelry", "watches"].includes(params.cat) ? params.cat : "bags";
  return <Store lots={getLots()} initialView="catalog" initialCat={cat} />;
}
