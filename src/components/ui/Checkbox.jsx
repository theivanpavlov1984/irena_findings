"use client";
import { C, body } from "../../constants/theme";
export function Checkbox({ on, onClick, children, ff }) {
  return (
    <button
      onClick={onClick}
      className="cbx"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "7px 0",
        fontFamily: ff || body,
        fontSize: 14,
        color: on ? C.ink : C.ink2,
        width: "100%",
        textAlign: "left",
        transition: "color .25s",
      }}
    >
      <span
        style={{
          width: 17,
          height: 17,
          borderRadius: 3,
          border: "1px solid " + (on ? C.ink : C.line),
          background: on ? C.ink : "transparent",
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
          transition: "all .25s",
        }}
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 12 12"
          style={{ opacity: on ? 1 : 0, transition: "opacity .2s" }}
        >
          <path
            d="M2.5 6.2L5 8.5L9.5 3.5"
            stroke={C.bg}
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {children}
    </button>
  );
}
