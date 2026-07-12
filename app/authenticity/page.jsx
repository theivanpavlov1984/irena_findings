import Store from "../../src/IrenaStore.jsx";
import { getLots } from "../../lib/lots.js";

export const metadata = {
  title: "Проверка подлинности — Irena | Находки",
  description: "Аппаратная проверка Entrupy для сумок, экспертиза ювелира для украшений, ручная проверка специалиста для Hermès.",
};

export default function AuthPage() {
  return <Store lots={getLots()} initialView="authenticity" />;
}
