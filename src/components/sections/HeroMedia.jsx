"use client";
import { useEffect, useRef, useState } from "react";
import NextImage from "next/image";
export function HeroMedia({ images }) {
  const [idx, setIdx] = useState(0);
  const paused = useRef(false);
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  useEffect(() => {
    if (reduce || images.length <= 1) return;
    const t = setInterval(() => {
      if (!paused.current) setIdx((i) => (i + 1) % images.length);
    }, 5200);
    return () => clearInterval(t);
  }, [images.length, reduce]);
  return (
    <div
      onMouseEnter={() => {
        paused.current = true;
      }}
      onMouseLeave={() => {
        paused.current = false;
      }}
      style={{
        position: "relative",
        width: "min(100%,540px)",
        aspectRatio: "643 / 665",
        margin: "0 auto",
      }}
    >
      {images.map((src, i) => (
        <NextImage
          key={i}
          src={src}
          alt=""
          fill
          priority={i === 0}
          sizes="(max-width: 768px) 100vw, 540px"
          style={{
            objectFit: "contain",
            opacity: i === idx ? 1 : 0,
            transition: "opacity 1.2s ease",
            display: "block",
            pointerEvents: "none",
          }}
        />
      ))}
    </div>
  );
}
