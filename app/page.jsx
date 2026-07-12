import Store from "../src/IrenaStore.jsx";
import { getLots } from "../lib/lots.js";

export default function HomePage() {
  return <Store lots={getLots()} initialView="home" />;
}
