"use client";
import NextImage from "next/image";
import { PHOTOS } from "../../constants/media";
import { head } from "../../constants/theme";
("../../constants/theme");
export function LotImage({ lot, big, idx = 0 }) {
  const src = (lot.photos && (lot.photos[idx] || lot.photos[0])) || PHOTOS[lot.id];
  if (src)
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          background: "#fff",
          display: "grid",
          placeItems: "center",
        }}
      >
        <NextImage
          src={src}
          alt={lot.brand + " " + lot.model}
          fill
          sizes="(max-width: 768px) 50vw, 420px"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    );
  const isJ = lot.cat === "jewelry";
  const g = isJ
    ? "linear-gradient(150deg,#F3F1EC,#E4DECF)"
    : "linear-gradient(150deg,#EFEDE8,#DAD5C8)";
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: g,
        overflow: "hidden",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(120% 80% at 30% 18%, rgba(255,255,255,.55), transparent 60%)",
        }}
      />
      <div
        style={{
          fontFamily: head,
          fontWeight: 500,
          fontSize: big ? 120 : 52,
          color: "rgba(42,36,34,.08)",
        }}
      >
        {lot.brand.split(" ")[0][0]}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: 12,
          ...label,
          fontSize: 8.5,
          color: "rgba(42,36,34,.3)",
        }}
      >
        образец фото
      </div>
    </div>
  );
}
