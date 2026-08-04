"use client";
import { useEffect, useRef, useState } from "react";
export function useHideOnScroll() {
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);
  useEffect(() => {
    const on = () => {
      const y = window.scrollY;
      if (y < 120) setHidden(false);
      else if (y > last.current + 4) setHidden(true);
      else if (y < last.current - 4) setHidden(false);
      last.current = y;
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return hidden;
}
