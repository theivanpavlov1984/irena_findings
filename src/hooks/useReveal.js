"use client";
import { useEffect, useRef, useState } from "react";
export function useReveal(t = 0.13) {
  const ref = useRef(null);
  const [s, setS] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setS(true);
          io.disconnect();
        }
      },
      { threshold: t }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [t]);
  return [ref, s];
}
