import Store from "../../src/IrenaStore.jsx";
import { getLots } from "../../lib/lots.js";

export const metadata = { title: "Избранное — Irena | Находки", robots: { index: false } };

export default function AccountPage() {
  return <Store lots={getLots()} initialView="account" />;
}
