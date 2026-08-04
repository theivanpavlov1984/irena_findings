"use client";
import { useRef, useState } from "react";
import NextImage from "next/image";
import { ArrowRight } from "lucide-react";
import { COLLECTIONS } from "../../constants/catalog";
import { C, body, head } from "../../constants/theme";
("../../constants/theme");
export function Collections({ go, goCollection }) {
  const [hi, setHi] = useState(null);
  const [archTop, setArchTop] = useState(0);
  const secRef = useRef(null);
  const archRef = useRef(null);
  const rowsRef = useRef([]);
  const c = hi === null ? null : COLLECTIONS[hi];
  const enter = (i) => {
    setHi(i);
    const sec = secRef.current,
      row = rowsRef.current[i],
      arch = archRef.current;
    const first = rowsRef.current[0],
      last = rowsRef.current[COLLECTIONS.length - 1];
    if (!sec || !row || !arch || !first || !last) return;
    const sb = sec.getBoundingClientRect();
    const rb = row.getBoundingClientRect();
    const ah = arch.offsetHeight;
    const want = rb.top - sb.top + rb.height / 2 - ah / 2;
    const minT = first.getBoundingClientRect().top - sb.top;
    const maxT = last.getBoundingClientRect().bottom - sb.top - ah;
    setArchTop(Math.max(minT, Math.min(want, maxT)));
  };
  return (
    <section
      ref={secRef}
      className="wrap"
      style={{
        maxWidth: 1340,
        margin: "0 auto",
        padding: "clamp(60px,9vw,130px) 0",
        position: "relative",
      }}
    >
      <h2
        style={{
          fontFamily: head,
          fontWeight: 400,
          fontSize: "clamp(32px,4.6vw,58px)",
          margin: "0 0 clamp(28px,4vw,48px)",
          color: C.ink,
        }}
      >
        Коллекции
      </h2>
      <div
        className="col-arch"
        style={{
          position: "absolute",
          top: archTop,
          left: "53%",
          width: "clamp(184px,17vw,232px)",
          aspectRatio: "232 / 320",
          borderRadius: "1000px 1000px 0 0",
          border: "1px solid " + C.stroke,
          pointerEvents: "none",
          opacity: c ? 1 : 0,
          transform: "translate(-11px,-19px)",
          transition: "opacity .4s ease, top .5s cubic-bezier(.22,.61,.36,1)",
          zIndex: 2,
        }}
      />
      <div
        ref={archRef}
        className="col-arch"
        style={{
          position: "absolute",
          top: archTop,
          left: "53%",
          width: "clamp(184px,17vw,232px)",
          aspectRatio: "232 / 320",
          borderRadius: "1000px 1000px 0 0",
          overflow: "hidden",
          border: "1px solid " + C.stroke,
          pointerEvents: "none",
          opacity: c ? 1 : 0,
          transition: "opacity .4s ease, top .5s cubic-bezier(.22,.61,.36,1)",
          zIndex: 3,
          background: "#fff",
          display: "grid",
          placeItems: "center",
        }}
      >
        {c &&
          (c.img ? (
            <NextImage
              fill
              sizes="(max-width: 768px) 50vw, 380px"
              src={c.img}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
            />
          ) : (
            <div style={{ textAlign: "center", padding: 22 }}>
              <div style={{ fontFamily: head, fontSize: 22, color: C.ink, lineHeight: 1.1 }}>
                {c.n}
              </div>
              <div style={{ ...label, fontSize: 10, marginTop: 10 }}>{c.brand}</div>
            </div>
          ))}
      </div>
      <div style={{ position: "relative", zIndex: 1, borderTop: "1px solid " + C.line }}>
        {COLLECTIONS.map((x, i) => (
          <div
            key={x.n}
            ref={(el) => (rowsRef.current[i] = el)}
            onMouseEnter={() => enter(i)}
            onMouseLeave={() => setHi(null)}
            onClick={() =>
              goCollection ? goCollection(x.cat, x.n, x.brand) : go("catalog", x.cat)
            }
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
              padding: "clamp(18px,2.4vw,30px) 0",
              borderBottom: "1px solid " + C.line,
              cursor: "pointer",
              transition: "padding-left .35s ease, opacity .35s ease",
              paddingLeft: hi === i ? 14 : 0,
              opacity: hi === null || hi === i ? 1 : 0.4,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "clamp(14px,2vw,30px)",
                minWidth: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "'CyreneNum','Montserrat',sans-serif",
                  fontSize: 15,
                  color: C.ink2,
                  letterSpacing: ".02em",
                  flexShrink: 0,
                }}
              >
                {String(i + 1).padStart(2, "0")}/
              </span>
              <span
                style={{
                  fontFamily: head,
                  fontWeight: 400,
                  fontSize: "clamp(24px,3.4vw,46px)",
                  color: C.ink,
                  lineHeight: 1.05,
                }}
              >
                {x.n} <span style={{ color: C.ink2 }}>by</span> {x.brand}
              </span>
            </div>
            <span
              className="col-link"
              style={{
                fontFamily: body,
                fontWeight: 300,
                fontSize: 14,
                color: hi === i ? C.ink : C.ink2,
                whiteSpace: "nowrap",
                transition: "color .3s",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                flexShrink: 0,
              }}
            >
              Смотреть коллекцию <ArrowRight size={13} />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
