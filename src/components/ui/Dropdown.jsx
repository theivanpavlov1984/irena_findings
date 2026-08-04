"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { C, body, head } from "../../constants/theme";
export function Dropdown({ value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const cur = options.find((o) => o.v === value) || options[0];
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 9,
          background: "none",
          border: "none",
          padding: "2px 0",
          fontFamily: head,
          fontSize: 20,
          color: C.ink,
          cursor: "pointer",
        }}
      >
        {cur.l}
        <ChevronDown
          size={18}
          stroke={C.ink}
          style={{ transform: open ? "rotate(180deg)" : "none", transition: ".3s" }}
        />
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            right: 0,
            background: C.card,
            border: "1px solid " + C.line,
            minWidth: 190,
            zIndex: 30,
            boxShadow: "0 24px 48px -28px rgba(42,36,34,.34)",
          }}
        >
          {options.map((o) => (
            <button
              key={o.v}
              onClick={() => {
                onChange(o.v);
                setOpen(false);
              }}
              className="ddi"
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                background: o.v === value ? C.bg : "transparent",
                border: "none",
                padding: "12px 16px",
                fontFamily: body,
                fontSize: 13.5,
                color: C.ink,
                cursor: "pointer",
              }}
            >
              {o.l}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
