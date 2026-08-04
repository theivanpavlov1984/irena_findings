"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { Card } from "../catalog/Card";
import { SearchIcon } from "../icons/index";
import { C, body, head, label } from "../../constants/theme";
import { useLots } from "../../context/LotsContext";
import { btnGhost, btnInk } from "../../constants/theme";
export function SearchOverlay({
  onClose,
  favs,
  onFav,
  onOpen,
  recent = [],
  onRemember,
  onClearRecent,
}) {
  const LOTS = useLots();
  const [q, setQ] = useState("");
  const inputRef = useRef(null);
  useEffect(() => {
    const t = setTimeout(() => inputRef.current && inputRef.current.focus(), 60);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  const RU = {
    chanel: "шанель",
    "louis vuitton": "луи виттон лв",
    cartier: "картье",
    "van cleef & arpels": "ван клиф ванклиф",
    bvlgari: "булгари бвлгари",
    "tiffany & co.": "тиффани",
    "herm\u00e8s": "эрмес гермес биркин",
    "bottega veneta": "боттега венета",
    fendi: "фенди багет",
    "saint laurent": "сен лоран ив ysl",
    graff: "графф",
    chaumet: "шоме",
    "versace \u00d7 fendi": "фендаче версаче фенди",
    versace: "версаче",
  };
  const hay = (l) =>
    (
      l.brand +
      " " +
      (RU[l.brand.toLowerCase()] || "") +
      " " +
      l.model +
      " " +
      (l.collection || "") +
      " " +
      (l.type || "") +
      " " +
      (l.metal || "") +
      " " +
      (l.cat === "bags" ? "сумка сумки" : "украшение украшения ювелирка")
    ).toLowerCase();
  const tokens = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const results =
    tokens.length === 0
      ? []
      : LOTS.filter((l) => {
          const h = hay(l);
          return tokens.every((t) => h.includes(t));
        });
  const hot = ["Chanel", "Louis Vuitton", "Cartier", "Van Cleef", "Vanity", "Keepall", "Love"];
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 140,
        background: C.bg,
        overflowY: "auto",
        animation: "fadeIn .25s ease",
      }}
    >
      <div
        className="wrap"
        style={{
          maxWidth: 1340,
          margin: "0 auto",
          padding: "clamp(26px,4vw,52px) 0 clamp(60px,8vw,110px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: 14,
              borderBottom: "2px solid " + C.ink,
              paddingBottom: 12,
            }}
          >
            <SearchIcon size={22} />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onRemember && onRemember(q);
              }}
              placeholder="Бренд, модель, коллекция…"
              style={{
                flex: 1,
                background: "none",
                border: "none",
                outline: "none",
                fontFamily: head,
                fontWeight: 400,
                fontSize: "clamp(22px,3.4vw,40px)",
                color: C.ink,
                padding: 0,
              }}
            />
          </div>
          <span
            onClick={onClose}
            className="ico"
            style={{ cursor: "pointer", display: "inline-flex" }}
            aria-label="Закрыть поиск"
          >
            <X size={26} strokeWidth={1.4} />
          </span>
        </div>

        {tokens.length === 0 ? (
          <div style={{ marginTop: "clamp(30px,5vw,54px)" }}>
            {recent.length > 0 && (
              <div style={{ marginBottom: "clamp(28px,4vw,42px)" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
                  <div style={{ ...label, fontSize: 10.5, color: C.ink2 }}>Вы искали</div>
                  <button
                    onClick={onClearRecent}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: body,
                      fontWeight: 300,
                      fontSize: 12,
                      color: C.ink2,
                      padding: 0,
                    }}
                    className="hov"
                  >
                    очистить
                  </button>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 18 }}>
                  {recent.map((r) => (
                    <button
                      key={r}
                      onClick={() => setQ(r)}
                      className="btn-secondary"
                      style={{
                        ...btnGhost,
                        padding: "10px 20px",
                        fontSize: 10.5,
                        textTransform: "none",
                        letterSpacing: 0.4,
                        fontFamily: body,
                      }}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div style={{ ...label, fontSize: 10.5, color: C.ink2 }}>Часто ищут</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 18 }}>
              {hot.map((h) => (
                <button
                  key={h}
                  onClick={() => setQ(h)}
                  className="btn-secondary"
                  style={{ ...btnGhost, padding: "10px 20px", fontSize: 10.5 }}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>
        ) : results.length > 0 ? (
          <div style={{ marginTop: "clamp(30px,5vw,54px)" }}>
            <div style={{ ...label, fontSize: 10.5, color: C.ink2 }}>
              {"Найдено: " + results.length}
            </div>
            <div
              className="newin-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: 60,
                marginTop: 24,
              }}
            >
              {results.map((lot, i) => (
                <Card
                  key={lot.id}
                  lot={lot}
                  i={i}
                  fav={favs.has(lot.id)}
                  onFav={onFav}
                  onOpen={(l) => {
                    onRemember && onRemember(q);
                    onClose();
                    onOpen(l);
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div
            style={{
              marginTop: "clamp(40px,7vw,80px)",
              textAlign: "center",
              maxWidth: 560,
              marginInline: "auto",
            }}
          >
            <h3
              style={{
                fontFamily: head,
                fontWeight: 400,
                fontSize: "clamp(24px,3.2vw,40px)",
                lineHeight: 1.15,
                margin: 0,
                color: C.ink,
              }}
            >
              Сейчас такого нет в подборке
            </h3>
            <p
              style={{
                fontFamily: body,
                fontWeight: 300,
                fontSize: 16,
                lineHeight: 1.7,
                color: C.ink2,
                marginTop: 16,
              }}
            >
              Но это не значит, что мы не найдём. Оставьте запрос – Ирина подберёт варианты под вас
              и проверит подлинность.
            </p>
            <button
              onClick={() => {
                onClose();
                window.__goSearchForm && window.__goSearchForm();
              }}
              style={{ ...btnInk, marginTop: 26 }}
              className="btn-primary"
            >
              Найдём и привезём <ArrowRight size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
