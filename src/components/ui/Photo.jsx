"use client";
import NextImage from "next/image";
import { C } from "../../constants/theme";
export function Photo({ src, alt, ratio, fit }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: ratio || "1",
        overflow: "hidden",
        background: C.panel,
      }}
    >
      <NextImage
        src={src}
        alt={alt || ""}
        fill
        sizes="(max-width: 768px) 50vw, 300px"
        style={{ width: "100%", height: "100%", objectFit: fit || "cover", display: "block" }}
      />
    </div>
  );
}
