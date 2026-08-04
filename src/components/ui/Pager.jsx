"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { C, mont } from "../../constants/theme";
export function Pager({ page, pages, onPage }) {
  if (pages <= 1) return null;
  const nums = Array.from({ length: pages }, (_, i) => i + 1);
  const nav = (dir, to, disabled) => (
    <button
      onClick={() => {
        if (!disabled) onPage(to);
      }}
      disabled={disabled}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.borderColor = C.ink;
          e.currentTarget.style.color = C.ink;
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.borderColor = C.line;
          e.currentTarget.style.color = C.ink2;
        }
      }}
      style={{
        width: 42,
        height: 42,
        borderRadius: "50%",
        display: "grid",
        placeItems: "center",
        background: "none",
        border: "1px solid " + (disabled ? "rgba(42,36,34,.07)" : C.line),
        cursor: disabled ? "default" : "pointer",
        color: disabled ? "rgba(42,36,34,.2)" : C.ink2,
        transition: "border-color .25s, color .25s",
      }}
    >
      {dir === "prev" ? <ChevronLeft size={17} /> : <ChevronRight size={17} />}
    </button>
  );
  return (
    <div
      style={{
        marginTop: "clamp(48px,6vw,74px)",
        paddingTop: "clamp(30px,4vw,44px)",
        borderTop: "1px solid " + C.line,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      {nav("prev", page - 1, page <= 1)}
      <div style={{ display: "flex", alignItems: "center", gap: 4, margin: "0 6px" }}>
        {nums.map((n) =>
          n === page ? (
            <span
              key={n}
              style={{
                minWidth: 42,
                height: 42,
                padding: "0 8px",
                borderRadius: 42,
                background: C.ink,
                display: "grid",
                placeItems: "center",
                fontFamily: mont,
                fontSize: 14,
                fontWeight: 500,
                color: "#fff",
              }}
            >
              {n}
            </span>
          ) : (
            <button
              key={n}
              onClick={() => onPage(n)}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.ink)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.ink2)}
              style={{
                minWidth: 42,
                height: 42,
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: mont,
                fontSize: 14,
                color: C.ink2,
                transition: "color .25s",
              }}
            >
              {n}
            </button>
          )
        )}
      </div>
      {nav("next", page + 1, page >= pages)}
    </div>
  );
}
