"use client";
import { LotImage } from "./LotImage";
import { HeartIcon } from "../icons/index";
import { STATUS } from "../../constants/catalog";
import { C, body, head, label } from "../../constants/theme";
import { useReveal } from "../../hooks/useReveal";
import { fmt } from "../../utils/format";
export function Card({ lot, fav, onFav, onOpen, i, tag = true }) {
  const [ref, s] = useReveal();
  return (
    <article
      ref={ref}
      onClick={() => onOpen(lot)}
      className="card"
      style={{
        cursor: "pointer",
        background: "transparent",
        border: "1px solid " + C.stroke,
        overflow: "hidden",
        opacity: s ? 1 : 0,
        transform: s ? "none" : "translateY(28px)",
        transition: "all .8s cubic-bezier(.16,.8,.3,1) " + (i % 3) * 0.06 + "s",
      }}
    >
      <div
        className="card-imgbox"
        style={{
          position: "relative",
          aspectRatio: "9 / 10",
          overflow: "hidden",
          background: "#fff",
        }}
      >
        <div className="card-img" style={{ width: "100%", height: "100%" }}>
          <LotImage lot={lot} />
        </div>
        {lot.isNew && tag && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              ...label,
              color: "#fff",
              background: C.accent,
              fontSize: 9,
              padding: "5px 12px",
            }}
          >
            Новинка
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFav(lot.id);
          }}
          aria-label="В избранное"
          className="fav"
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            width: 38,
            height: 38,
            borderRadius: 30,
            border: "none",
            background: "rgba(255,255,255,.82)",
            backdropFilter: "blur(4px)",
            display: "grid",
            placeItems: "center",
            color: C.ink,
            cursor: "pointer",
          }}
        >
          <HeartIcon size={17} filled={fav} />
        </button>
      </div>
      <div
        style={{
          padding: "14px 16px 15px",
          borderTop: "1px solid " + C.stroke,
          background: "transparent",
        }}
      >
        <div style={{ ...label, fontSize: 9.5 }}>{lot.brand}</div>
        <div
          style={{
            fontFamily: head,
            fontWeight: 500,
            fontSize: 17,
            color: C.ink,
            marginTop: 5,
            lineHeight: 1.2,
          }}
        >
          {lot.model}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginTop: 12,
          }}
        >
          <div style={{ fontFamily: body, fontWeight: 600, fontSize: 15, color: C.ink }}>
            {fmt(lot.price, lot.currency)}
          </div>
          <div style={{ ...label, fontSize: 9.5 }}>{STATUS[lot.status]}</div>
        </div>
      </div>
    </article>
  );
}

/* ---------- product overlay (поверх хедера) ---------- */
