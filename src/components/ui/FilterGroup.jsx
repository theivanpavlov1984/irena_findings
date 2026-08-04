"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { C, head, mont } from "../../constants/theme";
export function FilterGroup({ title, children, defaultOpen = true, limit = 0 }) {
  const [open, setOpen] = useState(defaultOpen);
  const [more, setMore] = useState(false);
  const items = React.Children.toArray(children);
  const capped = limit > 0 && items.length > limit && !more;
  const shown = capped ? items.slice(0, limit) : items;
  return (
    <div style={{ borderBottom: "1px solid " + C.line }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "16px 0",
          fontFamily: head,
          fontWeight: 500,
          fontSize: 17,
          color: C.ink,
          textAlign: "left",
        }}
      >
        <span>{title}</span>
        <ChevronDown
          size={16}
          stroke={C.ink2}
          style={{ flexShrink: 0, transform: open ? "rotate(180deg)" : "none", transition: ".3s" }}
        />
      </button>
      {open && (
        <div style={{ paddingBottom: 16 }}>
          {shown}
          {limit > 0 && items.length > limit && (
            <button
              onClick={() => setMore((m) => !m)}
              onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = C.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = "transparent")}
              style={{
                marginTop: 10,
                padding: "0 0 1px",
                background: "none",
                border: "none",
                borderBottom: "1px solid transparent",
                cursor: "pointer",
                fontFamily: mont,
                fontSize: 12,
                letterSpacing: ".04em",
                color: C.accent,
                transition: "border-color .25s",
              }}
            >
              {more ? "Свернуть" : "Показать больше (" + (items.length - limit) + ")"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
