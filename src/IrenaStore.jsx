"use client";
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import NextImage from "next/image";
import { ArrowRight, X, ChevronDown, ChevronLeft, ChevronRight, Instagram, Send, SlidersHorizontal, Share2 } from "lucide-react";

/* IRENA · Находки – прототип v5 */

const TELEGRAM = "https://t.me/irenabrow";        // личка Ирины: бронь, заявки, вопросы
const TELEGRAM_CHANNEL = "https://t.me/irena_findings"; // канал «Irena | Находки»
const INSTAGRAM = "https://instagram.com/irena_browart"; // ← реальный инстаграм
const ADDRESS = "г. Москва, Ленинский проспект, д. 4, стр. 1а, 4 этаж";

const IMG = { inspector: "/img/inspector.jpg", device: "/img/device.jpg", cert: "/img/cert.jpg" };
const ENTRUPY_BANNER = "/img/entrupy_banner.jpg";
const ENTRUPY_BOX = "/img/entrupy_box.jpg";
const ENTRUPY_LV = "/img/entrupy_lv.jpg";
const GRAFF = "/img/graff.svg";
const VANITY = "/img/vanity.svg";
const KEEPAL = "/img/keepal.svg";
const KEEPAL1 = "/img/keepal1.svg";
const VANCLEEF = "/img/vancleef.svg";
const JUSTE = "/img/juste.svg";
const HERO_IMAGES = [GRAFF, JUSTE, KEEPAL, VANCLEEF, VANITY, KEEPAL1];
function HeroMedia({ images }) {
  const [idx, setIdx] = useState(0);
  const paused = useRef(false);
  const reduce = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  useEffect(() => {
    if (reduce || images.length <= 1) return;
    const t = setInterval(() => { if (!paused.current) setIdx((i) => (i + 1) % images.length); }, 5200);
    return () => clearInterval(t);
  }, [images.length, reduce]);
  return (
    <div onMouseEnter={() => { paused.current = true; }} onMouseLeave={() => { paused.current = false; }} style={{ position: "relative", width: "min(100%,540px)", aspectRatio: "643 / 665", margin: "0 auto" }}>
      {images.map((src, i) => (
        <NextImage key={i} src={src} alt="" fill priority={i === 0} sizes="(max-width: 768px) 100vw, 540px" style={{ objectFit: "contain", opacity: i === idx ? 1 : 0, transition: "opacity 1.2s ease", display: "block", pointerEvents: "none" }} />
      ))}
    </div>
  );
}
const C = { bg: "#F5F4F2", panel: "#E5E0D8", card: "#FFFFFF", ink: "#2A2422", ink2: "#8A7B74", line: "rgba(42,36,34,0.13)", accent: "#652527", hot: "#E96442", gold: "#BFA055", btn: "#652527", stroke: "#D9D1C6" };
const head = "'Cyrene', 'Oranienbaum', serif";
const body = "'Cyrene', 'Montserrat', sans-serif";
const mont = "'Montserrat', sans-serif";
const JBANNER = "/img/jbanner.svg";
const BAG_BRANDS = ["Chanel", "Hermès", "Louis Vuitton", "Versace", "Versace × Fendi", "Dior", "Gucci", "Prada", "Bottega Veneta", "Saint Laurent", "Celine", "Goyard", "Fendi", "Loewe", "Balenciaga", "Givenchy", "Valentino", "Miu Miu", "Chloé", "Delvaux"];
const JEWELRY_BRANDS = ["Cartier", "Louis Vuitton", "Van Cleef & Arpels", "Bvlgari", "Tiffany & Co.", "Graff", "Chopard", "Chaumet", "Boucheron", "Messika", "Pomellato", "Piaget", "Harry Winston", "Mikimoto", "Damiani"];
const BAG_COLLECTIONS = ["Classic Flap", "2.55", "Boy", "Vanity", "Wallet on Chain", "19", "Gabrielle", "Coco Handle", "Keepall", "Speedy", "Neverfull", "Alma", "Capucines", "OnTheGo", "Pochette", "Lady Dior", "Saddle", "Book Tote", "Birkin", "Kelly", "Constance", "Dionysus", "GG Marmont", "Jackie", "Jodie", "Cassette", "Puzzle"];
const JEWELRY_COLLECTIONS = ["Alhambra", "Love", "Juste un Clou", "Panthère", "Trinity", "Clash", "Serpenti", "B.zero1", "Divas' Dream", "Tiffany T", "Tiffany Lock", "Happy Diamonds", "Possession", "Plume"];
const BAG_TYPES = ["Мини-сумки", "Кросс-боди", "Сумки через плечо", "Тоут", "Рюкзаки", "Дорожные"];
const CONDITIONS = ["Новое", "Отличное", "Хорошее", "Винтаж"];
function FilterGroup({ title, children, defaultOpen = true, limit = 0 }) {
  const [open, setOpen] = useState(defaultOpen);
  const [more, setMore] = useState(false);
  const items = React.Children.toArray(children);
  const capped = limit > 0 && items.length > limit && !more;
  const shown = capped ? items.slice(0, limit) : items;
  return (
    <div style={{ borderBottom: "1px solid " + C.line }}>
      <button onClick={() => setOpen((o) => !o)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", background: "none", border: "none", cursor: "pointer", padding: "16px 0", fontFamily: head, fontWeight: 500, fontSize: 17, color: C.ink, textAlign: "left" }}>
        <span>{title}</span>
        <ChevronDown size={16} stroke={C.ink2} style={{ flexShrink: 0, transform: open ? "rotate(180deg)" : "none", transition: ".3s" }} />
      </button>
      {open && <div style={{ paddingBottom: 16 }}>
        {shown}
        {limit > 0 && items.length > limit && <button onClick={() => setMore((m) => !m)} onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = C.accent)} onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = "transparent")} style={{ marginTop: 10, padding: "0 0 1px", background: "none", border: "none", borderBottom: "1px solid transparent", cursor: "pointer", fontFamily: mont, fontSize: 12, letterSpacing: ".04em", color: C.accent, transition: "border-color .25s" }}>{more ? "Свернуть" : "Показать больше (" + (items.length - limit) + ")"}</button>}
      </div>}
    </div>
  );
}
const label = { fontFamily: body, fontSize: 11, letterSpacing: 2.4, textTransform: "uppercase", color: C.ink2 };
const PHOTOS = {};

const SPEC_LABELS = { color: "Цвет", metal: "Металл", size: "Размер", serial: "Серийный номер", complect: "Комплект" };
let LOTS = [];
const fmt = (n) => n == null ? "Цена по запросу" : new Intl.NumberFormat("ru-RU").format(n) + " \u20bd";
const STATUS = { available: "В наличии", reserved: "Бронь", in_transit: "В пути" };
const MARQUEE = ["Chanel", "Louis Vuitton", "Van Cleef & Arpels", "Cartier", "Tiffany & Co.", "Bvlgari", "Dior", "Bottega Veneta", "Hermès"];

/* ---------- primitives ---------- */
function useReveal(t = 0.13) { const ref = useRef(null); const [s, setS] = useState(false); useEffect(() => { const el = ref.current; if (!el) return; const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setS(true); io.disconnect(); } }, { threshold: t }); io.observe(el); return () => io.disconnect(); }, [t]); return [ref, s]; }
function useScrollY() { const [y, setY] = useState(0); useEffect(() => { const on = () => setY(window.scrollY); window.addEventListener("scroll", on, { passive: true }); return () => window.removeEventListener("scroll", on); }, []); return y; }
function useHideOnScroll() { const [hidden, setHidden] = useState(false); const last = useRef(0); useEffect(() => { const on = () => { const y = window.scrollY; if (y < 120) setHidden(false); else if (y > last.current + 4) setHidden(true); else if (y < last.current - 4) setHidden(false); last.current = y; }; window.addEventListener("scroll", on, { passive: true }); return () => window.removeEventListener("scroll", on); }, []); return hidden; }

function HeartIcon({ size = 20, filled }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ display: "block" }}>
    {filled && <path d="M12 20.6C12 20.6 3.4 14.6 3.4 8.7C3.4 5.8 5.6 3.7 8.2 3.7C9.9 3.7 11.3 4.7 12 6.1C12.7 4.7 14.1 3.7 15.8 3.7C18.4 3.7 20.6 5.8 20.6 8.7C20.6 14.6 12 20.6 12 20.6Z" fill="currentColor" />}
    <path fillRule="evenodd" clipRule="evenodd" d="M6.48311 2.81529C2.81152 3.99738 1.17386 8.00569 2.40482 11.8295C3.02947 13.6301 4.04534 15.2485 5.38004 16.5762C7.21101 18.3545 9.22254 19.9194 11.3849 21.2491L11.6304 21.3961C11.8656 21.5369 12.1598 21.5344 12.3926 21.3897L12.6218 21.2473C14.7812 19.9194 16.7927 18.3545 18.6174 16.5824C19.9584 15.2485 20.9743 13.6301 21.5937 11.8452C22.8291 8.00801 21.1847 3.9978 17.512 2.81535L17.2463 2.73623C15.5624 2.27309 13.773 2.5013 12.2645 3.35535L11.9964 3.51429L11.733 3.35623C10.1419 2.45344 8.2404 2.25003 6.48311 2.81529ZM11.3746 4.85427L11.5714 4.99538C11.8307 5.18111 12.1806 5.17742 12.436 4.98625C13.766 3.99057 15.4873 3.70082 17.0641 4.20669C19.9097 5.12284 21.2047 8.28096 20.2064 11.382C19.665 12.9417 18.7687 14.3696 17.5916 15.5405L17.0636 16.0421C15.641 17.3642 14.1026 18.561 12.4691 19.6156L12.0013 19.9098L12.144 19.9998C10.0805 18.7308 8.15375 17.2319 6.40582 15.5343C5.23505 14.3696 4.33877 12.9417 3.79207 11.3664C2.79808 8.27801 4.08746 5.12212 6.93153 4.20646C8.43331 3.72339 10.0706 3.96289 11.3746 4.85427ZM15.8703 6.48374C15.4855 6.36093 15.0739 6.57304 14.951 6.95749C14.8281 7.34194 15.0404 7.75316 15.4252 7.87597C16.1814 8.11735 16.7206 8.79803 16.7881 9.60096C16.822 10.0031 17.1757 10.3017 17.5782 10.2679C17.9807 10.2341 18.2796 9.8807 18.2457 9.47853C18.1288 8.08859 17.1917 6.90551 15.8703 6.48374Z" fill="currentColor" />
  </svg>);
}
function SearchIcon({ size = 20 }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ display: "block" }}>
    <path fillRule="evenodd" clipRule="evenodd" d="M11.6115 2C6.30323 2 2 6.20819 2 11.3993C2 16.5903 6.30323 20.7985 11.6115 20.7985C13.8819 20.7985 15.9684 20.0287 17.613 18.7415L20.7371 21.7886L20.8202 21.8586C21.1102 22.0685 21.5214 22.0446 21.7839 21.7873C22.0726 21.5043 22.072 21.0459 21.7825 20.7636L18.6952 17.7523C20.2649 16.0794 21.2231 13.8487 21.2231 11.3993C21.2231 6.20819 16.9198 2 11.6115 2ZM11.6115 3.44774C16.1022 3.44774 19.7426 7.00776 19.7426 11.3993C19.7426 15.7908 16.1022 19.3508 11.6115 19.3508C7.12086 19.3508 3.48044 15.7908 3.48044 11.3993C3.48044 7.00776 7.12086 3.44774 11.6115 3.44774Z" fill="currentColor" />
  </svg>);
}
function TgIcon({ size = 18, stroke }) { return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M21.5 4.3L2.9 11.4c-1 .4-1 1.1 .1 1.4l4.6 1.4 1.8 5.4c.2 .6 .1 .9 .8 .9 .5 0 .7-.2 1-.5l2.3-2.3 4.6 3.4c.9 .5 1.4 .2 1.6-.8l3-13.9c.3-1.2-.5-1.8-1.8-1.5z" stroke={stroke || C.ink2} strokeWidth="1.3" strokelinejoin="round" /></svg>); }
function UserIcon({ size = 20, ...rest }) { return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...rest}><path fillRule="evenodd" clipRule="evenodd" d="M12.0043 2C9.07027 2 6.69177 4.38864 6.69177 7.33517C6.69177 10.2817 9.07027 12.6703 12.0043 12.6703C14.9383 12.6703 17.3168 10.2817 17.3168 7.33517C17.3168 4.38864 14.9383 2 12.0043 2ZM12.0043 3.44767C14.1422 3.44767 15.8753 5.18816 15.8753 7.33517C15.8753 9.48218 14.1422 11.2227 12.0043 11.2227C9.8664 11.2227 8.1333 9.48218 8.1333 7.33517C8.1333 5.18816 9.8664 3.44767 12.0043 3.44767ZM9.83005 14.8209C9.05233 14.8749 8.26621 14.9859 7.4908 15.1521C5.99418 15.4604 4.79685 16.0763 4.28724 17.0999C4.09503 17.5002 3.99839 17.9288 4.00002 18.3627C3.99944 18.7935 4.0953 19.2227 4.28062 19.6153C4.76994 20.6271 5.8278 21.1997 7.25624 21.5171L7.51213 21.5705C8.26648 21.7407 9.05284 21.8553 9.84446 21.909C9.91189 21.9288 10.0726 21.9472 10.248 21.9561L10.3922 21.9615C10.4664 21.9633 10.5506 21.9637 10.676 21.9637C11.8138 22.0263 12.9934 22.0081 14.1675 21.9081C14.7932 21.8653 15.4231 21.7835 16.0477 21.6636L16.5151 21.5666C18.0576 21.2623 19.2126 20.6836 19.7186 19.6164C20.0937 18.8241 20.0937 17.9047 19.7188 17.1127C19.214 16.0483 18.0737 15.4744 16.5034 15.1509C15.8873 15.0194 15.2612 14.922 14.6307 14.8599L14.1697 14.8209C12.7259 14.6935 11.2738 14.6935 9.83005 14.8209ZM14.0436 16.263L14.0562 16.264C14.7799 16.3149 15.4991 16.4165 16.2087 16.568C17.3751 16.8083 18.1667 17.2067 18.4171 17.7348C18.6057 18.133 18.6057 18.5958 18.4169 18.9944C18.1829 19.4879 17.472 19.8691 16.4445 20.1021L16.2195 20.1498C15.496 20.3112 14.7791 20.4152 14.0576 20.4647C12.9379 20.5599 11.8249 20.5771 10.7148 20.5171L10.3212 20.5103C10.2119 20.5048 10.1198 20.4942 10.0345 20.4771C9.35872 20.4261 8.75066 20.3454 8.16027 20.2283L7.80775 20.1537C6.63771 19.9244 5.83915 19.5243 5.58024 18.989C5.48964 18.797 5.44125 18.5803 5.44154 18.3609C5.44073 18.1428 5.48848 17.931 5.58118 17.7379C5.83293 17.2324 6.67919 16.7971 7.78606 16.569C8.50073 16.4159 9.21962 16.3144 9.94294 16.264C11.316 16.143 12.6837 16.143 14.0436 16.263Z" fill="currentColor"/></svg>); }

function Photo({ src, alt, ratio, fit }) { return (<div style={{ position: "relative", width: "100%", aspectRatio: ratio || "1", overflow: "hidden", background: C.panel }}><NextImage src={src} alt={alt || ""} fill sizes="(max-width: 768px) 50vw, 300px" style={{ width: "100%", height: "100%", objectFit: fit || "cover", display: "block" }} /></div>); }
function LotImage({ lot, big, idx = 0 }) {
  const src = (lot.photos && (lot.photos[idx] || lot.photos[0])) || PHOTOS[lot.id];
  if (src) return (<div style={{ position: "relative", width: "100%", height: "100%", background: "#fff", display: "grid", placeItems: "center" }}><NextImage src={src} alt={lot.brand + " " + lot.model} fill sizes="(max-width: 768px) 50vw, 420px" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>);
  const isJ = lot.cat === "jewelry";
  const g = isJ ? "linear-gradient(150deg,#F3F1EC,#E4DECF)" : "linear-gradient(150deg,#EFEDE8,#DAD5C8)";
  return (<div style={{ position: "relative", width: "100%", height: "100%", background: g, overflow: "hidden", display: "grid", placeItems: "center" }}>
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 80% at 30% 18%, rgba(255,255,255,.55), transparent 60%)" }} />
    <div style={{ fontFamily: head, fontWeight: 500, fontSize: big ? 120 : 52, color: "rgba(42,36,34,.08)" }}>{lot.brand.split(" ")[0][0]}</div>
    <div style={{ position: "absolute", bottom: 10, left: 12, ...label, fontSize: 8.5, color: "rgba(42,36,34,.3)" }}>образец фото</div>
  </div>);
}

const btnInk = { display: "inline-flex", alignItems: "center", gap: 10, background: C.ink, color: C.bg, border: "none", padding: "16px 30px", fontFamily: "'Oranienbaum', serif", fontSize: 11.5, letterSpacing: 1.8, textTransform: "uppercase", textDecoration: "none", cursor: "pointer", transition: "background .3s, color .3s" };
const btnGhost = { display: "inline-flex", alignItems: "center", gap: 10, background: "transparent", color: C.ink, border: "1px solid " + C.ink, padding: "15px 28px", fontFamily: "'Oranienbaum', serif", fontSize: 11.5, letterSpacing: 1.8, textTransform: "uppercase", textDecoration: "none", cursor: "pointer", transition: "background .3s,color .3s" };

function Checkbox({ on, onClick, children, ff }) {
  return (<button onClick={onClick} className="cbx" style={{ display: "flex", alignItems: "center", gap: 12, background: "none", border: "none", cursor: "pointer", padding: "7px 0", fontFamily: ff || body, fontSize: 14, color: on ? C.ink : C.ink2, width: "100%", textAlign: "left", transition: "color .25s" }}>
    <span style={{ width: 17, height: 17, borderRadius: 3, border: "1px solid " + (on ? C.ink : C.line), background: on ? C.ink : "transparent", display: "grid", placeItems: "center", flexShrink: 0, transition: "all .25s" }}>
      <svg width="10" height="10" viewBox="0 0 12 12" style={{ opacity: on ? 1 : 0, transition: "opacity .2s" }}><path d="M2.5 6.2L5 8.5L9.5 3.5" stroke={C.bg} strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </span>{children}
  </button>);
}

function Pager({ page, pages, onPage }) {
  if (pages <= 1) return null;
  const nums = Array.from({ length: pages }, (_, i) => i + 1);
  const nav = (dir, to, disabled) => (
    <button onClick={() => { if (!disabled) onPage(to); }} disabled={disabled}
      onMouseEnter={(e) => { if (!disabled) { e.currentTarget.style.borderColor = C.ink; e.currentTarget.style.color = C.ink; } }}
      onMouseLeave={(e) => { if (!disabled) { e.currentTarget.style.borderColor = C.line; e.currentTarget.style.color = C.ink2; } }}
      style={{ width: 42, height: 42, borderRadius: "50%", display: "grid", placeItems: "center", background: "none", border: "1px solid " + (disabled ? "rgba(42,36,34,.07)" : C.line), cursor: disabled ? "default" : "pointer", color: disabled ? "rgba(42,36,34,.2)" : C.ink2, transition: "border-color .25s, color .25s" }}>
      {dir === "prev" ? <ChevronLeft size={17} /> : <ChevronRight size={17} />}
    </button>
  );
  return (<div style={{ marginTop: "clamp(48px,6vw,74px)", paddingTop: "clamp(30px,4vw,44px)", borderTop: "1px solid " + C.line, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
    {nav("prev", page - 1, page <= 1)}
    <div style={{ display: "flex", alignItems: "center", gap: 4, margin: "0 6px" }}>
      {nums.map((n) => n === page
        ? <span key={n} style={{ minWidth: 42, height: 42, padding: "0 8px", borderRadius: 42, background: C.ink, display: "grid", placeItems: "center", fontFamily: mont, fontSize: 14, fontWeight: 500, color: "#fff" }}>{n}</span>
        : <button key={n} onClick={() => onPage(n)} onMouseEnter={(e) => (e.currentTarget.style.color = C.ink)} onMouseLeave={(e) => (e.currentTarget.style.color = C.ink2)} style={{ minWidth: 42, height: 42, background: "none", border: "none", cursor: "pointer", fontFamily: mont, fontSize: 14, color: C.ink2, transition: "color .25s" }}>{n}</button>)}
    </div>
    {nav("next", page + 1, page >= pages)}
  </div>);
}

function Dropdown({ value, options, onChange }) {
  const [open, setOpen] = useState(false); const ref = useRef(null);
  useEffect(() => { const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }; document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h); }, []);
  const cur = options.find((o) => o.v === value) || options[0];
  return (<div ref={ref} style={{ position: "relative" }}>
    <button onClick={() => setOpen((o) => !o)} style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "none", border: "none", padding: "2px 0", fontFamily: head, fontSize: 20, color: C.ink, cursor: "pointer" }}>{cur.l}<ChevronDown size={18} stroke={C.ink} style={{ transform: open ? "rotate(180deg)" : "none", transition: ".3s" }} /></button>
    {open && (<div style={{ position: "absolute", top: "calc(100% + 6px)", right: 0, background: C.card, border: "1px solid " + C.line, minWidth: 190, zIndex: 30, boxShadow: "0 24px 48px -28px rgba(42,36,34,.34)" }}>
      {options.map((o) => <button key={o.v} onClick={() => { onChange(o.v); setOpen(false); }} className="ddi" style={{ display: "block", width: "100%", textAlign: "left", background: o.v === value ? C.bg : "transparent", border: "none", padding: "12px 16px", fontFamily: body, fontSize: 13.5, color: C.ink, cursor: "pointer" }}>{o.l}</button>)}
    </div>)}
  </div>);
}

function Logo({ onClick, dark, align = "center" }) {
  return (<div onClick={onClick} style={{ cursor: "pointer", textAlign: align, lineHeight: 1 }}>
    <div style={{ fontFamily: head, fontWeight: 400, fontSize: 30, letterSpacing: 0.5, color: dark ? C.bg : C.ink }}>Irena</div>
    <div style={{ display: "flex", alignItems: "center", justifyContent: align === "left" ? "flex-start" : "center", gap: 9, marginTop: 5 }}>
      <span style={{ width: 20, height: 1, background: dark ? "rgba(255,255,255,.3)" : C.line }} />
      <span style={{ fontFamily: body, fontSize: 8.5, letterSpacing: 4.5, textTransform: "uppercase", color: dark ? "rgba(255,255,255,.7)" : C.ink2 }}>Находки</span>
      <span style={{ width: 20, height: 1, background: dark ? "rgba(255,255,255,.3)" : C.line }} />
    </div>
  </div>);
}

const COLLECTIONS = [
  { n: "Alhambra", brand: "Van Cleef & Arpels", cat: "jewelry", img: "/img/img.jpg" },
  { n: "Butterfly", brand: "Graff", cat: "jewelry", img: "/img/img1.jpg" },
  { n: "Keepall", brand: "Louis Vuitton", cat: "bags", img: "/img/img2.jpg" },
  { n: "Vanity", brand: "Chanel", cat: "bags", img: "/img/img3.jpg" },
  { n: "Juste un Clou", brand: "Cartier", cat: "jewelry", img: "/img/img4.jpg" },
  { n: "Love", brand: "Cartier", cat: "jewelry", img: "/img/img5.jpg" },
  { n: "Tiffany T", brand: "Tiffany & Co.", cat: "jewelry", img: "/img/img6.jpg" },
];
function Collections({ go, goCollection }) {
  const [hi, setHi] = useState(null);
  const [archTop, setArchTop] = useState(0);
  const secRef = useRef(null);
  const archRef = useRef(null);
  const rowsRef = useRef([]);
  const c = hi === null ? null : COLLECTIONS[hi];
  const enter = (i) => {
    setHi(i);
    const sec = secRef.current, row = rowsRef.current[i], arch = archRef.current;
    const first = rowsRef.current[0], last = rowsRef.current[COLLECTIONS.length - 1];
    if (!sec || !row || !arch || !first || !last) return;
    const sb = sec.getBoundingClientRect();
    const rb = row.getBoundingClientRect();
    const ah = arch.offsetHeight;
    const want = (rb.top - sb.top) + rb.height / 2 - ah / 2;
    const minT = first.getBoundingClientRect().top - sb.top;
    const maxT = (last.getBoundingClientRect().bottom - sb.top) - ah;
    setArchTop(Math.max(minT, Math.min(want, maxT)));
  };
  return (
    <section ref={secRef} className="wrap" style={{ maxWidth: 1340, margin: "0 auto", padding: "clamp(60px,9vw,130px) 0", position: "relative" }}>
      <h2 style={{ fontFamily: head, fontWeight: 400, fontSize: "clamp(32px,4.6vw,58px)", margin: "0 0 clamp(28px,4vw,48px)", color: C.ink }}>Коллекции</h2>
      <div className="col-arch" style={{ position: "absolute", top: archTop, left: "53%", width: "clamp(184px,17vw,232px)", aspectRatio: "232 / 320", borderRadius: "1000px 1000px 0 0", border: "1px solid " + C.stroke, pointerEvents: "none", opacity: c ? 1 : 0, transform: "translate(-11px,-19px)", transition: "opacity .4s ease, top .5s cubic-bezier(.22,.61,.36,1)", zIndex: 2 }} />
        <div ref={archRef} className="col-arch" style={{ position: "absolute", top: archTop, left: "53%", width: "clamp(184px,17vw,232px)", aspectRatio: "232 / 320", borderRadius: "1000px 1000px 0 0", overflow: "hidden", border: "1px solid " + C.stroke, pointerEvents: "none", opacity: c ? 1 : 0, transition: "opacity .4s ease, top .5s cubic-bezier(.22,.61,.36,1)", zIndex: 3, background: "#fff", display: "grid", placeItems: "center" }}>
        {c && (c.img
          ? <img loading="lazy" decoding="async" src={c.img} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
          : <div style={{ textAlign: "center", padding: 22 }}><div style={{ fontFamily: head, fontSize: 22, color: C.ink, lineHeight: 1.1 }}>{c.n}</div><div style={{ ...label, fontSize: 10, marginTop: 10 }}>{c.brand}</div></div>)}
      </div>
      <div style={{ position: "relative", zIndex: 1, borderTop: "1px solid " + C.line }}>
        {COLLECTIONS.map((x, i) => (
          <div key={x.n} ref={(el) => (rowsRef.current[i] = el)} onMouseEnter={() => enter(i)} onMouseLeave={() => setHi(null)} onClick={() => (goCollection ? goCollection(x.cat, x.n, x.brand) : go("catalog", x.cat))} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, padding: "clamp(18px,2.4vw,30px) 0", borderBottom: "1px solid " + C.line, cursor: "pointer", transition: "padding-left .35s ease, opacity .35s ease", paddingLeft: hi === i ? 14 : 0, opacity: hi === null || hi === i ? 1 : 0.4 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(14px,2vw,30px)", minWidth: 0 }}>
              <span style={{ fontFamily: "'CyreneNum','Montserrat',sans-serif", fontSize: 15, color: C.ink2, letterSpacing: ".02em", flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}/</span>
              <span style={{ fontFamily: head, fontWeight: 400, fontSize: "clamp(24px,3.4vw,46px)", color: C.ink, lineHeight: 1.05 }}>{x.n} <span style={{ color: C.ink2 }}>by</span> {x.brand}</span>
            </div>
            <span className="col-link" style={{ fontFamily: body, fontWeight: 300, fontSize: 14, color: hi === i ? C.ink : C.ink2, whiteSpace: "nowrap", transition: "color .3s", display: "inline-flex", alignItems: "center", gap: 8, flexShrink: 0 }}>Смотреть коллекцию <ArrowRight size={13} /></span>
          </div>
        ))}
      </div>
    </section>
  );
}
function Sparkle({ size = 40, style }) { return (<svg width={size} height={size} viewBox="0 0 310 310" fill="none" style={style}><path d="M155 0L165.96 144.04L310 155L165.96 165.96L155 310L144.04 165.96L0 155L144.04 144.04L155 0Z" fill="#BFA055" /></svg>); }
function CircleArrow({ label: txt, onClick }) { return (<button onClick={onClick} className="ca" style={{ display: "inline-flex", alignItems: "center", gap: 16, background: "none", border: "none", cursor: "pointer", fontFamily: head, fontSize: 18, color: C.ink }}><span>{txt}</span><span className="ca-circle" style={{ width: 52, height: 52, borderRadius: 40, border: "1px solid " + C.line, display: "grid", placeItems: "center", transition: "all .35s" }}><ArrowRight size={18} stroke={C.ink} /></span></button>); }

/* ---------- card (без корзины) ---------- */
function Card({ lot, fav, onFav, onOpen, i, tag = true }) {
  const [ref, s] = useReveal();
  return (<article ref={ref} onClick={() => onOpen(lot)} className="card" style={{ cursor: "pointer", background: "transparent", border: "1px solid " + C.stroke, overflow: "hidden", opacity: s ? 1 : 0, transform: s ? "none" : "translateY(28px)", transition: "all .8s cubic-bezier(.16,.8,.3,1) " + ((i % 3) * 0.06) + "s" }}>
    <div className="card-imgbox" style={{ position: "relative", aspectRatio: "9 / 10", overflow: "hidden", background: "#fff" }}>
      <div className="card-img" style={{ width: "100%", height: "100%" }}><LotImage lot={lot} /></div>
      {lot.isNew && tag && <div style={{ position: "absolute", top: 0, left: 0, ...label, color: "#fff", background: C.accent, fontSize: 9, padding: "5px 12px" }}>Новинка</div>}
      <button onClick={(e) => { e.stopPropagation(); onFav(lot.id); }} aria-label="В избранное" className="fav" style={{ position: "absolute", top: 12, right: 12, width: 38, height: 38, borderRadius: 30, border: "none", background: "rgba(255,255,255,.82)", backdropFilter: "blur(4px)", display: "grid", placeItems: "center", color: C.ink, cursor: "pointer" }}><HeartIcon size={17} filled={fav} /></button>
    </div>
    <div style={{ padding: "14px 16px 15px", borderTop: "1px solid " + C.stroke, background: "transparent" }}>
      <div style={{ ...label, fontSize: 9.5 }}>{lot.brand}</div>
      <div style={{ fontFamily: head, fontWeight: 500, fontSize: 17, color: C.ink, marginTop: 5, lineHeight: 1.2 }}>{lot.model}</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 12 }}>
        <div style={{ fontFamily: body, fontWeight: 600, fontSize: 15, color: C.ink }}>{fmt(lot.price)}</div>
        <div style={{ ...label, fontSize: 9.5 }}>{STATUS[lot.status]}</div>
      </div>
    </div>
  </article>);
}

/* ---------- product overlay (поверх хедера) ---------- */
function ProductView({ lot, fav, favs, onFav, onOpen, onClose, onAuth, go, goBrand, onSearch }) {
  useEffect(() => { const sbw = window.innerWidth - document.documentElement.clientWidth; document.body.style.overflow = "hidden"; if (sbw > 0) { document.body.style.paddingRight = sbw + "px"; const hd = document.querySelector(".site-head"); if (hd) hd.style.paddingRight = sbw + "px"; } return () => { document.body.style.overflow = ""; document.body.style.paddingRight = ""; const hd = document.querySelector(".site-head"); if (hd) hd.style.paddingRight = ""; }; }, []);
  const showRetail = lot.retail && (lot.retail - lot.price) / lot.retail >= 0.4;
  const [lotUrl, setLotUrl] = useState("");
  useEffect(() => { setLotUrl(window.location.origin + "/lot/" + lot.id); }, [lot.id]);
  const tg = TELEGRAM + "?text=" + encodeURIComponent(
    "Здравствуйте, Ирина! Интересует " + lot.brand + " " + lot.model + " – " + fmt(lot.price) + "." +
    (lotUrl ? "\n" + lotUrl : "")
  );
  const catLabel = lot.cat === "bags" ? "Сумки" : "Украшения";
  const [tab, setTab] = useState("desc");
  const [ph, setPh] = useState(0);
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const url = window.location.href;
    const title = lot.brand + " " + lot.model + " – " + fmt(lot.price);
    if (navigator.share) {
      try { await navigator.share({ title, url }); } catch (e) {}
    } else if (navigator.clipboard) {
      try { await navigator.clipboard.writeText(title + "\n" + url); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch (e) {}
    }
  };
  const related = [...LOTS.filter((l) => l.id !== lot.id && l.cat === lot.cat), ...LOTS.filter((l) => l.id !== lot.id && l.cat !== lot.cat)].slice(0, 4);
  return (<div style={{ position: "fixed", inset: 0, zIndex: 120, background: C.bg, overflowY: "auto", animation: "fadeIn .35s ease" }}>
    <SiteHeader go={(v, c) => { onClose(); go(v, c); }} favs={favs} onSearch={onSearch} sticky />
    <div className="wrap" style={{ maxWidth: 1340, margin: "0 auto", padding: "24px 0 90px" }}>
      <nav aria-label="Хлебные крошки" style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 9, padding: "6px 0 30px" }}>
        <button onClick={() => { onClose(); go("home"); }} className="crumb">Главная</button>
        <span style={{ fontFamily: body, fontSize: 13, color: C.ink2, opacity: .5 }}>/</span>
        <button onClick={() => { onClose(); go("catalog", lot.cat); }} className="crumb">Каталог</button>
        <span style={{ fontFamily: body, fontSize: 13, color: C.ink2, opacity: .5 }}>/</span>
        <button onClick={() => { onClose(); go("catalog", lot.cat); }} className="crumb">{catLabel}</button>
        <span style={{ fontFamily: body, fontSize: 13, color: C.ink2, opacity: .5 }}>/</span>
        <button onClick={() => { if (goBrand) goBrand(lot.cat, lot.brand); }} className="crumb">{lot.brand}</button>
        <span style={{ fontFamily: body, fontSize: 13, color: C.ink2, opacity: .5 }}>/</span>
        <span style={{ fontFamily: body, fontSize: 13, color: C.ink }}>{lot.model}</span>
      </nav>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(28px,5vw,72px)", alignItems: "start" }} className="pv">
        <div className="pv-media" style={{ position: "sticky", top: 24 }}>
          <div style={{ background: "#fff", padding: "clamp(16px,3vw,40px)", border: "1px solid " + C.stroke }}><div key={ph} style={{ aspectRatio: "1", overflow: "hidden", animation: "fadeIn .5s ease" }}><LotImage lot={lot} big idx={ph} /></div></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginTop: 10 }}>{[0, 1, 2, 3].map((k) => { const has = lot.photos && k < lot.photos.length; return (<div key={k} onClick={() => has && setPh(k)} title={has ? undefined : "Скоро добавим больше фото"} style={{ cursor: has ? "pointer" : "default", background: has ? "#fff" : C.panel, padding: has ? 8 : 0, border: "1px solid " + (k === ph ? C.ink : C.stroke), transition: "border-color .3s" }}><div style={{ aspectRatio: "1", overflow: "hidden", display: "grid", placeItems: "center" }}>{has ? <LotImage lot={lot} idx={k} /> : <span style={{ fontFamily: body, fontSize: 22, fontWeight: 300, color: C.ink2, opacity: 0.4 }}>+</span>}</div></div>); })}</div>
        </div>
        <div style={{ paddingTop: 6 }}>
          <div style={label}>{lot.brand}</div>
          <h1 style={{ fontFamily: head, fontWeight: 500, fontSize: "clamp(32px,4.4vw,52px)", lineHeight: 1.05, margin: "10px 0 0", color: C.ink }}>{lot.model}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 20 }}>
            <div style={{ fontFamily: body, fontWeight: 600, fontSize: 24, color: C.ink }}>{fmt(lot.price)}</div>
            <span style={{ ...label, display: "inline-flex", alignItems: "center", gap: 7 }}><span style={{ width: 7, height: 7, borderRadius: 8, background: lot.status === "available" ? "#6E9B6A" : lot.status === "reserved" ? "#B4503C" : C.gold }} />{STATUS[lot.status]}</span>
          </div>
          {showRetail && <div style={{ fontFamily: body, fontSize: 13, color: C.ink2, marginTop: 8 }}>Ретейл в бутике – около {fmt(lot.retail)}</div>}
          <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
            <a href={tg} target="_blank" rel="noreferrer" style={btnInk} className="btn-primary">Забронировать у Ирины <ArrowRight size={15} /></a>
            <button onClick={() => onFav(lot.id)} style={{ ...btnGhost, padding: "14px 22px" }} className="btn-secondary"><HeartIcon size={15} filled={fav} /> {fav ? "В избранном" : "Сохранить"}</button>
            <button onClick={share} aria-label="Поделиться" className="btn-secondary" style={{ ...btnGhost, padding: "14px 18px" }}><Share2 size={15} strokeWidth={1.5} /> {copied ? "Скопировано" : "Поделиться"}</button>
          </div>
          <div style={{ fontFamily: body, fontWeight: 300, fontSize: 12.5, lineHeight: 1.65, color: C.ink2, marginTop: 14, maxWidth: 460 }}>Пошлины и доставка включены в цену. Бронь ни к чему не обязывает – Ирина подтвердит наличие и ответит лично. <span onClick={() => { onClose(); go("home"); setTimeout(() => window.__scrollToId && window.__scrollToId("how"), 180); }} style={{ color: C.accent, cursor: "pointer", whiteSpace: "nowrap" }} className="hov">Как это устроено →</span></div>
          <div style={{ marginTop: 36 }}>
            <div className="pv-tabs" style={{ display: "flex", gap: 26, borderBottom: "1px solid " + C.line }}>
              {[["desc", "Описание"], ["specs", "Характеристики"], ["auth", "Проверка"]].map(([k, t]) => (
                <button key={k} onClick={() => setTab(k)} style={{ background: "none", border: "none", cursor: "pointer", padding: "0 0 12px", fontFamily: head, fontWeight: 400, fontSize: 16, color: tab === k ? C.ink : C.ink2, borderBottom: tab === k ? "2px solid " + C.accent : "2px solid transparent", marginBottom: -1 }}>{t}</button>))}
            </div>
            {tab === "desc" && (<div style={{ marginTop: 22 }}>{String(lot.desc).split("\n\n").map((para, pi) => (<p key={pi} style={{ fontFamily: mont, fontWeight: 300, fontSize: 16, lineHeight: 1.7, color: C.ink, marginTop: pi ? 16 : 0 }}>{para}</p>))}</div>)}
            {tab === "specs" && (<div style={{ marginTop: 8 }}>
              {Object.entries(lot.specs || {}).filter(([, v]) => v).map(([k, v]) => (<div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 20, padding: "13px 0", borderBottom: "1px solid " + C.line, fontFamily: body, fontSize: 14 }}><span style={{ color: C.ink2 }}>{SPEC_LABELS[k] || k}</span><span style={{ color: C.ink, textAlign: "right" }}>{v}</span></div>))}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "13px 0", fontFamily: body, fontSize: 14 }}><span style={{ color: C.ink2 }}>Состояние</span><span style={{ textAlign: "right" }}>{lot.conditionNote || lot.condition || "уточняется"}</span></div>
            </div>)}
            {tab === "auth" && (<div style={{ marginTop: 22 }}>
              <p style={{ fontFamily: body, fontWeight: 300, fontSize: 15, lineHeight: 1.7, color: C.ink2, margin: "0 0 18px", maxWidth: 460 }}>{lot.auth === "entrupy" ? "Перед передачей сумка проходит аппаратную проверку Entrupy – с цифровым сертификатом, который можно проверить самостоятельно." : lot.auth === "expert" ? "Hermès проверяет профильный специалист вручную: кожа, строчка, клейма, фурнитура. Entrupy для Hermès не применяется – только живая экспертиза." : "Перед передачей украшение проверяет доверенный ювелир в Москве: металл, пробы, камни и клейма."} Гарантия подлинности действует всегда.</p>
              <button onClick={onAuth} style={{ width: "100%", display: "flex", gap: 16, alignItems: "center", textAlign: "left", background: C.card, border: "none", cursor: "pointer", padding: 14 }}>
                <div style={{ width: 80, flexShrink: 0 }}><Photo src={lot.auth === "entrupy" ? IMG.device : IMG.inspector} ratio="1/1" /></div>
                <div><div style={label}>Подлинность</div><div style={{ fontFamily: head, fontWeight: 500, fontSize: 17, color: C.ink, marginTop: 4, lineHeight: 1.15 }}>{lot.auth === "entrupy" ? "Проверка Entrupy" : lot.auth === "expert" ? "Экспертиза специалиста" : "Экспертиза ювелира"}</div><div style={{ ...label, marginTop: 8, color: C.accent }}>Как мы проверяем →</div></div>
              </button>
            </div>)}
          </div>
        </div>
      </div>
      <section style={{ marginTop: "clamp(72px,9vw,120px)" }}>
        <h2 style={{ fontFamily: head, fontWeight: 400, fontSize: "clamp(26px,3.4vw,42px)", textAlign: "center", color: C.ink, margin: "0 0 clamp(30px,4vw,52px)" }}>Вам может понравиться</h2>
        <div className="newin-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 60 }}>{related.map((rl, i) => <Card key={rl.id} lot={rl} i={i} fav={favs.has(rl.id)} onFav={onFav} onOpen={onOpen} />)}</div>
      </section>
    </div>
    <Footer go={(v, c) => { onClose(); go(v, c); }} />
  </div>);
}

/* ---------- search request ---------- */
function SearchRequest() {
  const [ref, s] = useReveal();
  const [f, setF] = useState({ brand: "", model: "", color: "", budget: "", link: "" });
  const text = encodeURIComponent("Здравствуйте, Ирина! Ищу под заказ:\nБренд: " + f.brand + "\nМодель: " + f.model + "\nЦвет: " + f.color + "\nБюджет: " + f.budget + (f.link ? "\nСсылка/комментарий: " + f.link : ""));
  const blank = (k, ph) => (<input value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} placeholder={ph} className="field" size={Math.max((f[k] || ph).length + 1, 5)} style={{ background: "none", border: "none", borderBottom: "2px solid " + C.accent, padding: "0 4px 3px", margin: "0 2px", fontSize: "inherit", lineHeight: 1.2, color: C.accent, fontFamily: "inherit", outline: "none", textAlign: "center", maxWidth: "92vw", verticalAlign: "baseline" }} />);
  return (<section ref={ref} id="sr" style={{ background: C.panel, position: "relative", left: "50%", transform: "translateX(-50%)", width: "100vw", maxWidth: "100vw", margin: "clamp(48px,6vw,90px) 0 0", opacity: s ? 1 : 0, transition: "opacity .9s ease" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(70px,9vw,130px) 24px", textAlign: "center" }}>
      <div style={{ ...label, color: C.accent }}>Под заказ</div>
      <h2 style={{ fontFamily: head, fontWeight: 400, fontSize: "clamp(32px,4.6vw,58px)", lineHeight: 1.05, margin: "16px 0 0", color: C.ink }}>Нет в подборке?<br />Найдём и привезём.</h2>
      <p style={{ fontFamily: head, fontWeight: 400, fontSize: "clamp(22px,3.2vw,40px)", lineHeight: 1.75, color: C.ink, margin: "clamp(40px,5vw,64px) auto 0", maxWidth: 980 }}>
        Ищу {blank("brand", "бренд")} , модель {blank("model", "какую")} ,<br className="mad-br" />в цвете {blank("color", "каком")} , с бюджетом до {blank("budget", "суммы")} ₽.
      </p>
      <div style={{ margin: "clamp(26px,3.6vw,40px) auto 0", maxWidth: 560 }}>
        <input value={f.link} onChange={(e) => setF({ ...f, link: e.target.value })} placeholder="Видели её где-то? Оставьте ссылку или пару слов – не обязательно" className="field" style={{ width: "100%", background: "none", border: "none", borderBottom: "1px solid " + C.line, padding: "12px 2px", fontSize: 14.5, color: C.ink, fontFamily: body, fontWeight: 300, outline: "none", textAlign: "center" }} />
      </div>
      <p style={{ fontFamily: body, fontWeight: 300, fontSize: 15, lineHeight: 1.7, color: C.ink2, margin: "clamp(24px,3.4vw,36px) auto 0", maxWidth: 460 }}>Ирина подберёт варианты под запрос, проверит подлинность и пришлёт фото до покупки.</p>
      <a href={TELEGRAM + "?text=" + text} target="_blank" rel="noreferrer" style={{ ...btnInk, marginTop: "clamp(26px,3.6vw,40px)" }} className="btn-primary">Отправить запрос Ирине <ArrowRight size={15} /></a>
    </div>
  </section>);
}

/* ---------- authenticity ---------- */
function Authenticity({ go }) {
  const facts = [["\u2248 99%", "точность аппаратной аутентификации Entrupy"], ["Сертификат", "цифровой паспорт подлинности к каждой сумке"], ["Гарантия", "вернём, если подлинность под вопросом"]];
  const Chapter = ({ num, img, alt, tag, title, text, text2, reverse }) => { const [r, s] = useReveal();
    return (<div ref={r} className="two" style={{ display: "grid", gridTemplateColumns: reverse ? "1fr 1.15fr" : "1.15fr 1fr", gap: "clamp(30px,5.5vw,84px)", alignItems: "start", opacity: s ? 1 : 0, transform: s ? "none" : "translateY(30px)", transition: "all .9s cubic-bezier(.16,.8,.3,1)" }}>
      <div style={{ order: reverse ? 2 : 1, marginTop: reverse ? "clamp(26px,5vw,84px)" : 0 }}>
        <div style={{ position: "relative", maxWidth: "clamp(320px,34vw,470px)", margin: "0 auto" }}>
          <div style={{ overflow: "hidden", borderRadius: "999px 999px 0 0" }}><Photo src={img} alt={alt} ratio="3/4" /></div>
          <div aria-hidden="true" style={{ position: "absolute", inset: "clamp(12px,1.8vw,20px)", border: "1px solid rgba(245,244,242,.75)", borderRadius: "999px 999px 0 0", pointerEvents: "none" }} />
        </div>
      </div>
      <div style={{ order: reverse ? 1 : 2, paddingTop: reverse ? 0 : "clamp(18px,3.6vw,52px)" }}>
        <div aria-hidden="true" style={{ fontFamily: head, fontWeight: 400, fontSize: "clamp(96px,14vw,190px)", lineHeight: 0.8, color: "transparent", WebkitTextStroke: "1.5px " + C.ink2, userSelect: "none" }}>{num}</div>
        <div style={{ ...label, color: C.accent, marginTop: 20 }}>{tag}</div>
        <h3 style={{ fontFamily: head, fontWeight: 400, fontSize: "clamp(26px,3.4vw,46px)", lineHeight: 1.06, margin: "14px 0 0", color: C.ink }}>{title}</h3>
        <p style={{ fontFamily: body, fontWeight: 300, fontSize: 16, lineHeight: 1.7, color: C.ink2, marginTop: 16, maxWidth: 460 }}>{text}</p>
        {text2 ? <p style={{ fontFamily: body, fontWeight: 300, fontSize: 16, lineHeight: 1.7, color: C.ink2, marginTop: 14, maxWidth: 460 }}>{text2}</p> : null}
      </div>
    </div>); };
  return (<div style={{ animation: "fadeIn .4s ease" }}>

    <section className="wrap" style={{ maxWidth: 1340, margin: "0 auto", padding: "clamp(160px,19vw,215px) 0 clamp(44px,7vw,84px)" }}>
      <div className="two" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "clamp(24px,4vw,60px)", alignItems: "end" }}>
        <div>
          <div style={{ ...label, color: C.accent }}>Подлинность</div>
          <h1 style={{ fontFamily: head, fontWeight: 400, fontSize: "clamp(44px,8vw,116px)", lineHeight: 0.98, margin: "18px 0 0", color: C.ink }}>Двойная<br />проверка,<br /><span style={{ color: C.accent }}>а не обещание</span></h1>
        </div>
        <p style={{ fontFamily: body, fontWeight: 300, fontSize: "clamp(16px,1.7vw,19px)", lineHeight: 1.75, color: C.ink2, margin: 0, paddingBottom: 10, maxWidth: 440 }}>Подделка – главный страх при покупке люкса с рук. Мы закрываем его на двух уровнях: аппарат Entrupy для сумок и экспертиза доверенного ювелира – для украшений.</p>
      </div>
    </section>

    <section style={{ position: "relative", left: "50%", transform: "translateX(-50%)", width: "100vw", maxWidth: "100vw" }}>
      <div style={{ height: "clamp(380px,48vw,660px)", overflow: "hidden" }}>
        <img loading="lazy" decoding="async" src={ENTRUPY_LV} alt="Проверка сумки Louis Vuitton аппаратом Entrupy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
      </div>
      <div style={{ position: "absolute", left: "clamp(16px,4vw,64px)", bottom: "clamp(16px,3.4vw,48px)", background: C.bg, padding: "14px 22px", boxShadow: "0 24px 48px -24px rgba(42,36,34,.4)" }}>
        <div style={{ ...label, fontSize: 10, color: C.ink2 }}>Кадр проверки</div>
        <div style={{ fontFamily: head, fontWeight: 400, fontSize: 17, color: C.ink, marginTop: 5 }}>Louis Vuitton · сканирование Entrupy</div>
      </div>
    </section>

    <section style={{ borderBottom: "1px solid " + C.line, marginTop: "clamp(56px,8vw,110px)" }}>
      <div style={{ maxWidth: 1340, margin: "0 auto", padding: "0 0 clamp(40px,6vw,72px)", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(28px,5vw,72px)" }} className="wrap g3">
        {facts.map(([n, d], i) => { const [r, s] = useReveal(); return (<div key={n} ref={r} style={{ textAlign: "center", opacity: s ? 1 : 0, transform: s ? "none" : "translateY(18px)", transition: "all .7s ease " + (i * 0.1) + "s" }}><div style={{ fontFamily: head, fontWeight: 400, fontSize: "clamp(36px,4.6vw,64px)", color: C.accent }}>{n}</div><div style={{ fontFamily: body, fontWeight: 300, fontSize: 14.5, lineHeight: 1.55, color: C.ink2, marginTop: 12, maxWidth: 240, marginInline: "auto" }}>{d}</div></div>); })}
      </div>
    </section>

    <section className="wrap" style={{ maxWidth: 1340, margin: "0 auto", padding: "clamp(60px,9vw,130px) 0", display: "grid", gap: "clamp(70px,11vw,150px)" }}>
      <Chapter num="01" img={ENTRUPY_BOX} alt="Аппарат Entrupy" tag="Сумки" title="Аппарат Entrupy" text="Entrupy – система аутентификации, которой пользуются ресейл-площадки и бутики по всему миру. Микроскопическая камера снимает структуру кожи, строчку, фурнитуру и логотипы с увеличением, недоступным глазу." text2="Снимки сравниваются с базой из миллионов подлинных образцов, и алгоритм выносит вердикт с точностью около 99%. Итог – цифровой сертификат с QR-кодом." />
      <Chapter num="02" img={IMG.inspector} alt="Экспертиза ювелира" tag="Украшения" title="Экспертиза ювелира" reverse text="Украшения проверяет доверенный ювелир в Москве: металл, пробы, камни и клейма – в том числе на приборе Diamond Inspector. Перед отправкой каждое изделие полируется." />
    </section>

    <section style={{ background: C.panel, position: "relative", left: "50%", transform: "translateX(-50%)", width: "100vw", maxWidth: "100vw", overflow: "hidden" }}>
      <div className="wrap two" style={{ maxWidth: 1340, margin: "0 auto", padding: "clamp(56px,9vw,120px) 24px", display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "clamp(32px,6vw,90px)", alignItems: "center" }}>
        <div>
          <div style={{ ...label, color: C.accent }}>Сертификат</div>
          <h3 style={{ fontFamily: head, fontWeight: 400, fontSize: "clamp(26px,3.4vw,46px)", lineHeight: 1.06, margin: "14px 0 0", color: C.ink }}>Паспорт подлинности к каждой сумке</h3>
          <p style={{ fontFamily: body, fontWeight: 300, fontSize: 16, lineHeight: 1.7, color: C.ink2, marginTop: 16, maxWidth: 420 }}>После проверки Entrupy выдаёт цифровой сертификат с фото, брендом, материалом и QR. Подлинность можно подтвердить самостоятельно на entrupy.com – ещё до получения сумки.</p>
        </div>
        <div style={{ transform: "rotate(-2.5deg)", boxShadow: "0 44px 80px -36px rgba(42,36,34,.45)", background: C.card, padding: "clamp(10px,1.6vw,20px)" }}>
          <Photo src={IMG.cert} alt="Сертификат Entrupy" ratio="3/2" fit="contain" />
        </div>
      </div>
    </section>

    <section className="wrap" style={{ maxWidth: 900, margin: "0 auto", padding: "clamp(70px,11vw,150px) 0", textAlign: "center" }}>
      <div style={{ ...label, color: C.accent }}>Возвраты</div>
      <h2 style={{ fontFamily: head, fontWeight: 400, fontSize: "clamp(30px,4.4vw,58px)", lineHeight: 1.12, margin: "18px 0 0", color: C.ink }}>Возврата «передумала» нет.<br /><span style={{ color: C.accent }}>Гарантия подлинности – всегда.</span></h2>
      <div className="two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(20px,3.4vw,48px)", textAlign: "left", marginTop: "clamp(30px,4.6vw,54px)" }}>
        <p style={{ fontFamily: body, fontWeight: 300, fontSize: 16, lineHeight: 1.75, color: C.ink2, margin: 0 }}>Каждая вещь привозится под конкретный заказ и проходит проверку подлинности, поэтому возврат «передумала» мы не делаем. Это честное условие премиального ресейла, и мы проговариваем его до покупки.</p>
        <p style={{ fontFamily: body, fontWeight: 300, fontSize: 16, lineHeight: 1.75, color: C.ink2, margin: 0 }}>Но если подлинность когда-либо вызовет сомнение или вещь не совпадёт с тем, что мы показали и обсудили, – вернём деньги или заменим. Гарантия подлинности действует всегда.</p>
      </div>
    </section>

    <section style={{ background: C.btn, color: "#fff" }}>
      <div className="wrap" style={{ maxWidth: 1340, margin: "0 auto", padding: "clamp(56px,9vw,110px) 0", textAlign: "center" }}>
        <h2 style={{ fontFamily: head, fontWeight: 400, fontSize: "clamp(28px,4vw,50px)", margin: 0 }}>Остался вопрос о подлинности?</h2>
        <div style={{ marginTop: 30, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <a href={TELEGRAM} target="_blank" rel="noreferrer" style={{ ...btnInk, background: "#fff", color: C.ink }} className="btn-primary">Написать Ирине</a>
          <button onClick={() => go("catalog")} style={{ ...btnGhost, color: "#fff", borderColor: "rgba(255,255,255,.4)" }} className="btn-secondary">Смотреть каталог</button>
        </div>
      </div>
    </section>
  </div>);
}

/* ---------- account ---------- */
function Account({ favs, onFav, onOpen, go }) {
  const [signedIn, setSignedIn] = useState(false);
  const items = LOTS.filter((l) => favs.has(l.id));
  const demo = LOTS[0];
  const steps = [
    ["Заявка у Ирины", "Получили запрос – Ирина скоро напишет вам лично."],
    ["Согласование", "Подтверждаем вещь, комплект и стоимость, выставляем счёт."],
    ["Выкуп и проверка", "Выкупаем у источника и проверяем подлинность: Entrupy или ювелир."],
    ["Передача", "Привозим и передаём лично или застрахованной доставкой."],
  ];
  const activeStep = 2;
  return (<div className="wrap" style={{ maxWidth: 1340, margin: "0 auto", padding: "clamp(160px,19vw,215px) 0 clamp(60px,9vw,120px)", animation: "fadeIn .4s ease" }}>
    <h1 style={{ fontFamily: head, fontWeight: 400, fontSize: "clamp(34px,5vw,64px)", textAlign: "center", margin: "0 0 clamp(36px,5vw,56px)", color: C.ink }}>Кабинет</h1>

    {!signedIn ? (
      <div style={{ maxWidth: 460, margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontFamily: body, fontWeight: 300, fontSize: 16, lineHeight: 1.7, color: C.ink2, margin: "0 0 32px" }}>Ваше личное пространство: заявки, что сейчас в работе, и лист ожидания вещей, которые ищем под вас. Вход через <span style={{ fontFamily: mont }}>Telegram</span> – без логинов и паролей.</p>
        <button onClick={() => setSignedIn(true)} style={{ ...btnInk, width: "100%", justifyContent: "center", gap: 10 }} className="btn-primary"><svg width="22" height="22" viewBox="0 0 24 24" fill={C.bg} xmlns="http://www.w3.org/2000/svg"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" /></svg> Войти через Telegram</button>
        <p style={{ fontFamily: body, fontWeight: 300, fontSize: 13, lineHeight: 1.7, color: C.ink2, marginTop: 28 }}>Чтобы написать Ирине, регистрация не нужна – кабинет можно завести после первого обращения.</p>
      </div>
    ) : (<div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, paddingBottom: 26, borderBottom: "1px solid " + C.line }}>
        <div style={{ width: 52, height: 52, borderRadius: 60, background: C.accent, color: "#fff", display: "grid", placeItems: "center", fontFamily: head, fontSize: 22 }}>А</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: head, fontWeight: 400, fontSize: 20, color: C.ink }}>Анна</div>
          <div style={{ fontFamily: mont, fontSize: 13, color: C.ink2 }}>@anna · через Telegram</div>
        </div>
        <button onClick={() => setSignedIn(false)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: body, fontSize: 13, color: C.ink2 }} className="hov">Выйти</button>
      </div>

      <section style={{ marginTop: "clamp(40px,6vw,70px)" }}>
        <h2 style={{ fontFamily: head, fontWeight: 400, fontSize: "clamp(24px,3vw,36px)", margin: "0 0 24px", color: C.ink }}>Мои заявки</h2>
        <div style={{ background: C.panel, padding: "clamp(24px,4vw,44px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, paddingBottom: 26, marginBottom: 30, borderBottom: "1px solid " + C.line }}>
            <div style={{ width: 60, height: 60, background: C.bg, border: "1px solid " + C.line, display: "grid", placeItems: "center", fontFamily: head, fontSize: 22, color: C.ink2 }}>{demo.brand.slice(0, 1)}</div>
            <div>
              <div style={{ ...label, fontSize: 10.5, color: C.ink2, marginBottom: 6 }}>Заявка · 14 июня</div>
              <div style={{ fontFamily: head, fontWeight: 400, fontSize: 19, color: C.ink }}>{demo.brand} {demo.model}</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: "clamp(20px,2.4vw,34px)" }}>
            {steps.map(([t, d], i) => { const active = i === activeStep; return (
              <div key={i} style={{ opacity: i > activeStep ? 0.45 : 1 }}>
                <div style={{ fontFamily: head, fontSize: 32, lineHeight: 1, color: active ? C.accent : C.ink }}>{String(i + 1).padStart(2, "0")}</div>
                <div style={{ height: 2, background: i <= activeStep ? C.accent : C.line, margin: "14px 0" }} />
                <div style={{ fontFamily: head, fontWeight: 400, fontSize: 16, color: C.ink, marginBottom: 6 }}>{t}</div>
                <div style={{ fontFamily: body, fontWeight: 300, fontSize: 13, lineHeight: 1.6, color: C.ink2 }}>{d}</div>
                {active && <div style={{ ...label, fontSize: 9.5, color: C.accent, marginTop: 10 }}>сейчас</div>}
              </div>); })}
          </div>
        </div>
      </section>

      <section style={{ marginTop: "clamp(48px,7vw,90px)" }}>
        <h2 style={{ fontFamily: head, fontWeight: 400, fontSize: "clamp(24px,3vw,36px)", margin: "0 0 24px", color: C.ink }}>Лист ожидания</h2>
        {items.length === 0 ? (<div style={{ borderTop: "1px solid " + C.line, paddingTop: 32, fontFamily: body, fontWeight: 300, color: C.ink2, fontSize: 16, lineHeight: 1.7 }}>Здесь будут вещи, которые вы отметили сердечком. Ирина видит ваш лист и напишет, когда нужное появится.<div style={{ marginTop: 22 }}><button onClick={() => go("catalog", "bags")} style={btnGhost} className="btn-secondary">В каталог</button></div></div>)
          : (<div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(18px,2.4vw,32px)" }} className="grid-c">{items.map((lot, i) => <Card key={lot.id} lot={lot} i={i} fav={true} onFav={onFav} onOpen={onOpen} />)}</div>)}
      </section>
    </div>)}
  </div>);
}

/* ============================== APP ============================== */
function SearchOverlay({ onClose, favs, onFav, onOpen, recent = [], onRemember, onClearRecent }) {
  const [q, setQ] = useState("");
  const inputRef = useRef(null);
  useEffect(() => { const t = setTimeout(() => inputRef.current && inputRef.current.focus(), 60); return () => clearTimeout(t); }, []);
  useEffect(() => { const h = (e) => { if (e.key === "Escape") onClose(); }; window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h); }, [onClose]);
  const RU = { "chanel": "шанель", "louis vuitton": "луи виттон лв", "cartier": "картье", "van cleef & arpels": "ван клиф ванклиф", "bvlgari": "булгари бвлгари", "tiffany & co.": "тиффани", "herm\u00e8s": "эрмес гермес биркин", "bottega veneta": "боттега венета", "fendi": "фенди багет", "saint laurent": "сен лоран ив ysl", "graff": "графф", "chaumet": "шоме", "versace \u00d7 fendi": "фендаче версаче фенди", "versace": "версаче" };
  const hay = (l) => (l.brand + " " + (RU[l.brand.toLowerCase()] || "") + " " + l.model + " " + (l.collection || "") + " " + (l.type || "") + " " + (l.metal || "") + " " + (l.cat === "bags" ? "сумка сумки" : "украшение украшения ювелирка")).toLowerCase();
  const tokens = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const results = tokens.length === 0 ? [] : LOTS.filter((l) => { const h = hay(l); return tokens.every((t) => h.includes(t)); });
  const hot = ["Chanel", "Louis Vuitton", "Cartier", "Van Cleef", "Vanity", "Keepall", "Love"];
  return (<div style={{ position: "fixed", inset: 0, zIndex: 140, background: C.bg, overflowY: "auto", animation: "fadeIn .25s ease" }}>
    <div className="wrap" style={{ maxWidth: 1340, margin: "0 auto", padding: "clamp(26px,4vw,52px) 0 clamp(60px,8vw,110px)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 14, borderBottom: "2px solid " + C.ink, paddingBottom: 12 }}>
          <SearchIcon size={22} />
          <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") onRemember && onRemember(q); }} placeholder="Бренд, модель, коллекция…" style={{ flex: 1, background: "none", border: "none", outline: "none", fontFamily: head, fontWeight: 400, fontSize: "clamp(22px,3.4vw,40px)", color: C.ink, padding: 0 }} />
        </div>
        <span onClick={onClose} className="ico" style={{ cursor: "pointer", display: "inline-flex" }} aria-label="Закрыть поиск"><X size={26} strokeWidth={1.4} /></span>
      </div>

      {tokens.length === 0 ? (
        <div style={{ marginTop: "clamp(30px,5vw,54px)" }}>
          {recent.length > 0 && (<div style={{ marginBottom: "clamp(28px,4vw,42px)" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
              <div style={{ ...label, fontSize: 10.5, color: C.ink2 }}>Вы искали</div>
              <button onClick={onClearRecent} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: body, fontWeight: 300, fontSize: 12, color: C.ink2, padding: 0 }} className="hov">очистить</button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 18 }}>
              {recent.map((r) => (<button key={r} onClick={() => setQ(r)} className="btn-secondary" style={{ ...btnGhost, padding: "10px 20px", fontSize: 10.5, textTransform: "none", letterSpacing: 0.4, fontFamily: body }}>{r}</button>))}
            </div>
          </div>)}
          <div style={{ ...label, fontSize: 10.5, color: C.ink2 }}>Часто ищут</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 18 }}>
            {hot.map((h) => (<button key={h} onClick={() => setQ(h)} className="btn-secondary" style={{ ...btnGhost, padding: "10px 20px", fontSize: 10.5 }}>{h}</button>))}
          </div>
        </div>
      ) : results.length > 0 ? (
        <div style={{ marginTop: "clamp(30px,5vw,54px)" }}>
          <div style={{ ...label, fontSize: 10.5, color: C.ink2 }}>{"Найдено: " + results.length}</div>
          <div className="newin-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 60, marginTop: 24 }}>
            {results.map((lot, i) => (<Card key={lot.id} lot={lot} i={i} fav={favs.has(lot.id)} onFav={onFav} onOpen={(l) => { onRemember && onRemember(q); onClose(); onOpen(l); }} />))}
          </div>
        </div>
      ) : (
        <div style={{ marginTop: "clamp(40px,7vw,80px)", textAlign: "center", maxWidth: 560, marginInline: "auto" }}>
          <h3 style={{ fontFamily: head, fontWeight: 400, fontSize: "clamp(24px,3.2vw,40px)", lineHeight: 1.15, margin: 0, color: C.ink }}>Сейчас такого нет в подборке</h3>
          <p style={{ fontFamily: body, fontWeight: 300, fontSize: 16, lineHeight: 1.7, color: C.ink2, marginTop: 16 }}>Но это не значит, что мы не найдём. Оставьте запрос – Ирина подберёт варианты под вас и проверит подлинность.</p>
          <button onClick={() => { onClose(); window.__goSearchForm && window.__goSearchForm(); }} style={{ ...btnInk, marginTop: 26 }} className="btn-primary">Найдём и привезём <ArrowRight size={15} /></button>
        </div>
      )}
    </div>
  </div>);
}

function SiteHeader({ go, favs, floating = false, hidden = false, sticky = false, onSearch }) {
  const hStyle = floating
    ? { position: "fixed", top: 0, left: 0, right: 0, zIndex: 90, background: C.bg, transform: hidden ? "translateY(-100%)" : "translateY(0)", transition: "transform .45s cubic-bezier(.16,.8,.3,1)" }
    : sticky ? { position: "sticky", top: 0, zIndex: 60, background: C.bg }
    : { position: "relative", background: C.bg };
  return (
    <header className="site-head" style={hStyle}>
      <div className="wrap" style={{ maxWidth: 1340, margin: "0 auto", padding: "16px 0 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center" }}>
          <div />
          <Logo onClick={() => go("home")} />
          <div style={{ display: "flex", gap: 22, justifyContent: "flex-end", alignItems: "center", color: C.ink }}>
            <span onClick={onSearch} className="ico" style={{ cursor: "pointer", display: "inline-flex" }} aria-label="Поиск"><SearchIcon size={19} /></span>
            <span onClick={() => go("account")} style={{ cursor: "pointer", position: "relative", display: "inline-flex" }} className="ico"><HeartIcon size={19} filled={favs.size > 0} />{favs.size > 0 && <span style={{ position: "absolute", top: -8, right: -10, background: C.accent, color: "#fff", fontSize: 9, fontFamily: body, width: 16, height: 16, borderRadius: 10, display: "grid", placeItems: "center" }}>{favs.size}</span>}</span>
            <UserIcon size={19} className="ico" style={{ cursor: "pointer" }} onClick={() => go("account")} />
          </div>
        </div>
        <nav className="nav-row" style={{ display: "flex", justifyContent: "center", gap: "clamp(20px,3vw,46px)", padding: "14px 0", marginTop: 12, borderTop: "1px solid " + C.line }}>
          {[["Сумки", () => go("catalog", "bags")], ["Украшения", () => go("catalog", "jewelry")], ["Подлинность", () => go("authenticity")], ["Под заказ", () => { go("home"); setTimeout(() => window.__scrollToId && window.__scrollToId("sr"), 120); }]].map(([t, fn]) => (<span key={t} className="navlink" onClick={fn} style={{ fontFamily: head, fontSize: 15, color: C.ink, cursor: "pointer" }}>{t}</span>))}
        </nav>
      </div>
    </header>
  );
}

function Footer({ go }) {
  return (
    <footer style={{ borderTop: "1px solid " + C.line }}>
      <div style={{ maxWidth: 1340, margin: "0 auto", padding: "clamp(50px,7vw,90px) 0", display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1.3fr", gap: 40 }} className="wrap foot">
        <div>
          <div style={{ fontWeight: 400, fontSize: 26, letterSpacing: 0.5 }}><span style={{ fontFamily: head, color: C.ink }}>Irena</span> <span style={{ fontFamily: mont, color: C.ink2, fontSize: 18 }}>| Находки</span></div>
          <p style={{ fontFamily: body, fontWeight: 300, fontSize: 14, lineHeight: 1.7, color: C.ink2, maxWidth: 290, marginTop: 16 }}>Персональный байер премиальных сумок и украшений. Под заказ, с проверкой подлинности.</p>
          <div style={{ display: "flex", gap: 12, marginTop: 22 }}>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram" className="soc" style={{ width: 40, height: 40, display: "grid", placeItems: "center" }}><Instagram size={18} strokeWidth={1.4} /></a>
            <a href={TELEGRAM_CHANNEL} target="_blank" rel="noreferrer" aria-label="Telegram" className="soc" style={{ width: 40, height: 40, display: "grid", placeItems: "center" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 1 }}><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" /></svg></a>
          </div>
        </div>
        <div><div style={{ fontFamily: head, fontWeight: 500, fontSize: 16, marginBottom: 16, color: C.ink }}>Каталог</div>{[["Сумки", () => go("catalog", "bags")], ["Украшения", () => go("catalog", "jewelry")], ["Под заказ", () => { go("home"); setTimeout(() => window.__scrollToId && window.__scrollToId("sr"), 200); }]].map(([t, fn]) => <div key={t} onClick={fn} style={{ fontFamily: body, fontWeight: 300, fontSize: 14, color: C.ink2, marginBottom: 11, cursor: "pointer" }}>{t}</div>)}</div>
        <div><div style={{ fontFamily: head, fontWeight: 500, fontSize: 16, marginBottom: 16, color: C.ink }}>Сервис</div>{[["Подлинность", () => go("authenticity")], ["Кабинет", () => go("account")]].map(([t, fn]) => <div key={t} onClick={fn} style={{ fontFamily: body, fontWeight: 300, fontSize: 14, color: C.ink2, marginBottom: 11, cursor: "pointer" }}>{t}</div>)}<a href={TELEGRAM} target="_blank" rel="noreferrer" style={{ fontFamily: body, fontWeight: 300, fontSize: 14, color: C.ink2, textDecoration: "none", display: "block" }}>Контакты</a></div>
        <div>
          <div style={{ fontFamily: head, fontWeight: 500, fontSize: 16, marginBottom: 14, color: C.ink }}>Шоурум</div>
          <p style={{ fontFamily: body, fontWeight: 300, fontSize: 14, lineHeight: 1.7, color: C.ink2, marginBottom: 18 }}>{ADDRESS}<br /><span style={{ fontSize: 13 }}>По предварительной записи</span></p>
          <a href={TELEGRAM_CHANNEL} target="_blank" rel="noreferrer" style={{ ...btnInk, padding: "13px 22px" }} className="btn-primary">Канал · Находки <ArrowRight size={15} /></a>
        </div>
      </div>
      <div className="wrap" style={{ maxWidth: 1340, margin: "0 auto", padding: "20px 0", borderTop: "1px solid " + C.line, ...label, fontSize: 10.5 }}>Москва · {new Date().getFullYear()} · прототип витрины</div>
    </footer>
  );
}

export default function App({ lots = [], initialView = "home", initialCat = "bags", initialLot = null }) {
  LOTS = lots;
  const [view, setView] = useState(initialView);
  const [cat, setCat] = useState(initialCat);
  const [sort, setSort] = useState("new");
  const [filters, setFilters] = useState({ brands: [], collections: [], types: [], conditions: [], metals: [], price: [] });
  const [favs, setFavs] = useState(new Set());
  const [open, setOpen] = useState(initialLot);
  const [searchOpen, setSearchOpen] = useState(false);
  const firstSync = useRef(true);
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const b = q.get("brand");
    const col = q.get("collection");
    if (b || col) setFilters((f) => ({ ...f, brands: b ? [b] : f.brands, collections: col ? [col] : f.collections }));
  }, []);
  const pathFor = useCallback((v, c, o, f) => {
    if (o) return "/lot/" + o.id;
    if (v === "catalog") {
      const q = [];
      if (f && f.collections && f.collections.length === 1) q.push("collection=" + encodeURIComponent(f.collections[0]));
      if (f && f.brands && f.brands.length === 1) q.push("brand=" + encodeURIComponent(f.brands[0]));
      return "/catalog/" + c + (q.length ? "?" + q.join("&") : "");
    }
    if (v === "authenticity") return "/authenticity";
    if (v === "account") return "/account";
    return "/";
  }, []);
  useEffect(() => {
    const path = pathFor(view, cat, open, filters);
    if (typeof window === "undefined") return;
    if (firstSync.current) { firstSync.current = false; window.history.replaceState({ view, cat, lotId: open ? open.id : null }, "", path); return; }
    if (window.location.pathname + window.location.search !== path) window.history.pushState({ view, cat, lotId: open ? open.id : null }, "", path);
  }, [view, cat, open, filters, pathFor]);
  useEffect(() => {
    const onPop = () => {
      const p = window.location.pathname;
      const mLot = p.match(/^\/lot\/(.+)$/);
      if (mLot) { const l = LOTS.find((x) => x.id === mLot[1]); setOpen(l || null); if (l) setCat(l.cat); return; }
      setOpen(null);
      const mCat = p.match(/^\/catalog\/(bags|jewelry)$/);
      if (mCat) { setCat(mCat[1]); setView("catalog"); return; }
      if (p === "/authenticity") { setView("authenticity"); return; }
      if (p === "/account") { setView("account"); return; }
      setView("home");
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  const [filtersOpen, setFiltersOpen] = useState(false);
  useEffect(() => { if (filtersOpen) { const sbw = window.innerWidth - document.documentElement.clientWidth; document.body.style.overflow = "hidden"; if (sbw > 0) { document.body.style.paddingRight = sbw + "px"; const hd = document.querySelector(".site-head"); if (hd) hd.style.paddingRight = sbw + "px"; } } else { document.body.style.overflow = ""; document.body.style.paddingRight = ""; const hd = document.querySelector(".site-head"); if (hd) hd.style.paddingRight = ""; } return () => { document.body.style.overflow = ""; document.body.style.paddingRight = ""; const hd = document.querySelector(".site-head"); if (hd) hd.style.paddingRight = ""; }; }, [filtersOpen]);
  const [recentSearches, setRecentSearches] = useState([]);
  const rememberSearch = useCallback((q) => { const t = (q || "").trim(); if (t.length < 2) return; setRecentSearches((p) => [t, ...p.filter((x) => x.toLowerCase() !== t.toLowerCase())].slice(0, 6)); }, []);
  const [page, setPage] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const hidden = useHideOnScroll();

  useEffect(() => { const t = setTimeout(() => setLoaded(true), 70); return () => clearTimeout(t); }, []);
  useEffect(() => { const hd = document.querySelector(".site-head"); if (hd) { hd.style.transition = "none"; requestAnimationFrame(() => requestAnimationFrame(() => { hd.style.transition = ""; })); } window.scrollTo(0, 0); }, [view]);
  useEffect(() => { setFilters({ brands: [], collections: [], types: [], conditions: [], metals: [], price: [] }); }, [cat]);
  useEffect(() => { setPage(1); }, [cat, sort, filters]);

  const onFav = useCallback((id) => setFavs((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; }), []);
  const go = (v, c) => { if (c) setCat(c); setView(v); setFiltersOpen(false); };
  const goCollection = (c, collection, brand) => {
    setCat(c);
    setFilters((f) => ({ ...f, collections: [collection], brands: brand ? [brand] : [] }));
    setOpen(null);
    setView("catalog");
    setFiltersOpen(false);
  };
  const goBrand = (c, brand) => {
    setCat(c);
    setFilters((f) => ({ ...f, brands: [brand] }));
    setOpen(null);
    setView("catalog");
    setFiltersOpen(false);
  };
  useEffect(() => { window.__scrollToId = (id) => { const el = document.getElementById(id); if (!el) return; const hd = document.querySelector(".site-head"); const off = window.innerWidth <= 900 && hd ? hd.offsetHeight + 6 : 10; window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - off, behavior: "smooth" }); }; window.__goSearchForm = () => { setOpen(null); setView("home"); setTimeout(() => window.__scrollToId && window.__scrollToId("sr"), 160); }; return () => { delete window.__goSearchForm; delete window.__scrollToId; }; }, []);
  const toggle = (key, val) => setFilters((f) => ({ ...f, [key]: f[key].includes(val) ? f[key].filter((x) => x !== val) : [...f[key], val] }));

  const brandOpts = cat === "bags" ? BAG_BRANDS : JEWELRY_BRANDS;
  const collectionOpts = cat === "bags" ? BAG_COLLECTIONS : JEWELRY_COLLECTIONS;
  const typeOpts = cat === "bags" ? BAG_TYPES : [];
  const condOpts = CONDITIONS;
  const metalOpts = useMemo(() => [...new Set(LOTS.filter((l) => l.cat === cat && l.metal).map((l) => l.metal))], [cat]);
  const PRICE = [["< 200к", 0, 200000], ["200–400к", 200000, 400000], ["400к +", 400000, 1e12]];

  const list = useMemo(() => {
    let l = LOTS.filter((x) => x.cat === cat);
    if (filters.brands.length) l = l.filter((x) => filters.brands.includes(x.brand));
    if (filters.collections.length) l = l.filter((x) => filters.collections.includes(x.collection));
    if (filters.types.length) l = l.filter((x) => filters.types.includes(x.type));
    if (filters.conditions.length) l = l.filter((x) => filters.conditions.includes(x.condition));
    if (filters.metals.length) l = l.filter((x) => filters.metals.includes(x.metal));
    if (filters.price.length) l = l.filter((x) => filters.price.some((pi) => { const p = PRICE[pi]; return x.price >= p[1] && x.price < p[2]; }));
    if (sort === "asc") l = [...l].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    if (sort === "desc") l = [...l].sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
    return l;
  }, [cat, sort, filters]);

  const anyFilter = filters.brands.length || filters.collections.length || filters.types.length || filters.conditions.length || filters.metals.length || filters.price.length;
  const activeCount = filters.brands.length + filters.collections.length + filters.types.length + filters.conditions.length + filters.metals.length + filters.price.length;
  const filterGroups = (<><FilterGroup title="Бренд" limit={7}>{brandOpts.map((b) => <Checkbox key={b} ff={mont} on={filters.brands.includes(b)} onClick={() => toggle("brands", b)}>{b}</Checkbox>)}</FilterGroup>{collectionOpts.length > 0 && <FilterGroup title="Коллекция" limit={7} defaultOpen={false}>{collectionOpts.map((c) => <Checkbox key={c} ff={mont} on={filters.collections.includes(c)} onClick={() => toggle("collections", c)}>{c}</Checkbox>)}</FilterGroup>}{typeOpts.length > 0 && <FilterGroup title="Категория">{typeOpts.map((t) => <Checkbox key={t} on={filters.types.includes(t)} onClick={() => toggle("types", t)}>{t}</Checkbox>)}</FilterGroup>}
            {metalOpts.length > 0 && <FilterGroup title="Металл">{metalOpts.map((m) => <Checkbox key={m} on={filters.metals.includes(m)} onClick={() => toggle("metals", m)}>{m}</Checkbox>)}</FilterGroup>}
            <FilterGroup title="Состояние">{condOpts.map((c) => <Checkbox key={c} on={filters.conditions.includes(c)} onClick={() => toggle("conditions", c)}>{c}</Checkbox>)}</FilterGroup>
            {LOTS.some((l) => l.price != null) && <FilterGroup title="Цена">{PRICE.map((p, idx) => <Checkbox key={p[0]} on={filters.price.includes(idx)} onClick={() => toggle("price", idx)}>{p[0]}</Checkbox>)}</FilterGroup>}
            {anyFilter ? <button onClick={() => setFilters({ brands: [], collections: [], types: [], conditions: [], metals: [], price: [] })} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", marginTop: 18, ...label, fontSize: 11, color: C.accent }}><X size={13} /> Сбросить фильтры</button> : null}</>);
  const PAGE_SIZE = 6;
  const pageCount = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const cur = Math.min(page, pageCount);
  const paged = list.slice((cur - 1) * PAGE_SIZE, cur * PAGE_SIZE);

  return (<div style={{ background: C.bg, color: C.ink, fontFamily: body, minHeight: "calc(100vh + 1px)", position: "relative" }}>
    <style>{`
      @font-face{font-family:'Montserrat';font-style:normal;font-weight:300;font-display:swap;src:url(/fonts/montserrat-300-cyr.woff2) format('woff2');unicode-range:U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;}
@font-face{font-family:'Montserrat';font-style:normal;font-weight:300;font-display:swap;src:url(/fonts/montserrat-300-lat.woff2) format('woff2');unicode-range:U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}
@font-face{font-family:'Montserrat';font-style:normal;font-weight:400;font-display:swap;src:url(/fonts/montserrat-400-cyr.woff2) format('woff2');unicode-range:U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;}
@font-face{font-family:'Montserrat';font-style:normal;font-weight:400;font-display:swap;src:url(/fonts/montserrat-400-lat.woff2) format('woff2');unicode-range:U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}
@font-face{font-family:'Montserrat';font-style:normal;font-weight:500;font-display:swap;src:url(/fonts/montserrat-500-cyr.woff2) format('woff2');unicode-range:U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;}
@font-face{font-family:'Montserrat';font-style:normal;font-weight:500;font-display:swap;src:url(/fonts/montserrat-500-lat.woff2) format('woff2');unicode-range:U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}
@font-face{font-family:'Oranienbaum';font-style:normal;font-weight:400;font-display:swap;src:url(/fonts/oranienbaum-400-cyr.woff2) format('woff2');unicode-range:U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;}
@font-face{font-family:'Oranienbaum';font-style:normal;font-weight:400;font-display:swap;src:url(/fonts/oranienbaum-400-lat.woff2) format('woff2');unicode-range:U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;}
      @font-face{font-family:'Cyrene';src:url(/fonts/cyrene-400-lat.woff2) format('woff2');font-display:swap;unicode-range:U+0041-005A,U+0061-007A,U+00C0-00D6,U+00D8-00F6,U+00F8-00FF;}
      @font-face{font-family:'CyreneNum';src:url(/fonts/cyrenenum-400-lat.woff2) format('woff2');font-display:swap;}
      *{box-sizing:border-box;-webkit-font-smoothing:antialiased;}
      body{margin:0;}
      @keyframes fadeIn{from{opacity:0}to{opacity:1}
      @keyframes drawerIn{from{transform:translateX(100%)}to{transform:translateX(0)}}}
      @keyframes rise{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:none}}
      @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
      .card{transition:box-shadow .4s,transform .4s;}
      .card:hover{transform:translateY(-4px);box-shadow:0 24px 48px -32px rgba(42,36,34,.28);}
      .card .card-img{transition:transform 1s cubic-bezier(.16,.8,.3,1);}
      .card:hover .card-img{transform:scale(1.05);}
      .card .fav{opacity:0;transform:translateY(-4px);transition:all .35s;}
      .card:hover .fav{opacity:1;transform:none;}
      .fav:hover{background:#fff !important;}
      .hov:hover{opacity:.86;}
      .crumb{color:${C.ink2};font-family:${body};font-size:13px;background:none;border:none;padding:0;cursor:pointer;transition:color .2s;}
      .crumb:hover{color:${C.ink};}
      .btn-primary:hover{background:${C.hot} !important;color:#fff !important;}
      .btn-secondary:hover{background:${C.ink} !important;color:${C.bg} !important;}
      .ca:hover .ca-circle{background:${C.ink};}
      .ca:hover .ca-circle svg{stroke:#fff;}
      .navlink{position:relative;}
      .navlink::after{content:'';position:absolute;left:0;bottom:-5px;height:1px;width:0;background:currentColor;transition:width .3s;}
      .navlink:hover::after{width:100%;}
      .ico:hover{color:${C.accent};}
      .ghost:hover{background:${C.ink};color:${C.bg};}
      .ddi:hover{background:${C.bg};}
      .cbx:hover{color:${C.ink};}
      .field::placeholder{color:${C.ink2};}
      .field:focus{border-bottom-color:${C.ink};}
      .mq{display:flex;width:max-content;animation:marquee 38s linear infinite;}
      .marquee:hover .mq{animation-play-state:paused;}
      .soc{border-radius:50%;overflow:hidden;transition:all .25s ease;border:1px solid ${C.ink2};color:${C.ink2}}
.soc:hover{border-color:#000;background:#000;color:#fff}

      ::selection{background:${C.accent};color:#fff;}
      @media(max-width:900px){.hero-sec{height:auto !important;}.two,.pv,.acc{grid-template-columns:1fr !important;}.acc-div{display:none;}.pv-media{position:static !important;}.g3{grid-template-columns:1fr !important;}.cat-grid{grid-template-columns:1fr !important;}.cat-aside{display:none !important;}.filters-btn{display:inline-flex !important;width:100%;}.toolbar-right{width:100%;}#sr,#how{scroll-margin-top:122px}.sort-inline{display:none !important;}.grid-c{grid-template-columns:1fr 1fr !important;}.nav-row{justify-content:flex-start !important;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none;}.nav-row > :first-child{margin-left:auto}.nav-row > :last-child{margin-right:auto}.site-head{transform:none !important}.hero-grid{grid-template-columns:1fr !important;}.foot{grid-template-columns:1fr 1fr !important;}.newin-grid{grid-template-columns:1fr 1fr !important;gap:28px !important;}.col-arch{display:none !important;}.col-link{display:none !important;}}
      #sr,#how{scroll-margin-top:10px}
      :focus-visible{outline:2px solid ${C.accent};outline-offset:3px}
      :focus:not(:focus-visible){outline:none}
      @media(min-width:901px){.filters-btn{display:none !important}}
      .nav-row::-webkit-scrollbar{display:none}
      .nav-row .navlink{white-space:nowrap}
      .pv-tabs::-webkit-scrollbar{display:none}
      @media(max-width:640px){.mad-br{display:none}.quote-sec{min-height:300px !important}.pv-tabs{overflow-x:auto;gap:18px !important;scrollbar-width:none}.pv-tabs button{white-space:nowrap}}
      @media(max-width:540px){.grid-c{grid-template-columns:1fr 1fr !important;gap:12px !important;}.foot{grid-template-columns:1fr !important;}.newin-grid{grid-template-columns:1fr !important;}}
      @media(max-width:1380px){.wrap{padding-left:clamp(20px,5vw,40px) !important;padding-right:clamp(20px,5vw,40px) !important;}}
    `}</style>

    {/* HEADER */}
    <SiteHeader go={go} favs={favs} floating hidden={hidden} onSearch={() => setSearchOpen(true)} />

    {view === "home" && (<>
      {/* HERO */}
      <section className="hero-sec" style={{ position: "relative", height: "clamp(560px, 67.7vw, 1300px)", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <Sparkle size={108} style={{ position: "absolute", top: "11%", right: "7%" }} />
        <Sparkle size={86} style={{ position: "absolute", bottom: "11%", left: "39%" }} />
        <Sparkle size={46} style={{ position: "absolute", top: "54%", left: "3%" }} />
        <div className="wrap" style={{ maxWidth: 1340, margin: "0 auto", padding: "clamp(150px,18vw,208px) 0 clamp(48px,5vw,72px)", width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }} className="hero-grid">
            <div style={{ opacity: loaded ? 1 : 0, animation: loaded ? "rise 1s cubic-bezier(.16,.8,.3,1) both" : "none" }}>
              <div style={{ ...label, color: C.accent, marginBottom: 22 }}>Под заказ · с проверкой подлинности</div>
              <h1 style={{ fontFamily: head, fontWeight: 400, fontSize: "clamp(46px,7vw,104px)", lineHeight: 1.0, margin: 0, color: C.ink }}>Находки,<br />отобранные<br />лично</h1>
              <p style={{ fontFamily: body, fontWeight: 300, fontSize: 17, lineHeight: 1.7, color: C.ink2, margin: "28px 0 40px", maxWidth: 380 }}>Подлинные сумки и украшения под заказ – отбор Ирины, проверка Entrupy и ювелира.</p>
              <CircleArrow label="Смотреть подборку" onClick={() => go("catalog", "bags")} />
              <div style={{ marginTop: 24 }}><span onClick={() => { window.__scrollToId && window.__scrollToId("sr"); }} style={{ fontFamily: body, fontWeight: 300, fontSize: 15, color: C.ink2, cursor: "pointer", borderBottom: "1px solid " + C.line, paddingBottom: 3 }} className="hov">Или найдём под заказ – расскажите, что ищете</span></div>
            </div>
            <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", minHeight: 460 }}>
              <HeroMedia images={HERO_IMAGES} />
            </div>
          </div>
        </div>
      </section>

      {/* BRAND MARQUEE – заменить текст на реальные лого (img) когда будут файлы */}
      <section className="marquee" style={{ borderTop: "1px solid " + C.line, borderBottom: "1px solid " + C.line, overflow: "hidden", padding: "clamp(30px,4vw,52px) 0" }}>
        <div className="mq">
          {[0, 1].map((rep) => (<div key={rep} style={{ display: "flex", alignItems: "center", flexShrink: 0 }} aria-hidden={rep === 1}>
            {MARQUEE.map((b) => (<span key={b + rep} style={{ display: "inline-flex", alignItems: "center" }}>
              <span style={{ fontFamily: head, fontWeight: 400, fontSize: "clamp(20px,2.4vw,30px)", letterSpacing: 2, color: "rgba(42,36,34,.42)", padding: "0 clamp(28px,4vw,60px)", whiteSpace: "nowrap" }}>{b}</span>
              <span style={{ width: 5, height: 5, transform: "rotate(45deg)", background: "rgba(42,36,34,.22)", flexShrink: 0 }} />
            </span>))}
          </div>))}
        </div>
      </section>

      {/* SELECTION */}
      <section className="wrap" style={{ maxWidth: 1340, margin: "0 auto", padding: "clamp(60px,9vw,130px) 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "clamp(32px,4vw,52px)" }}>
          <div><div style={{ ...label, color: C.accent }}>Доступно сейчас</div><h2 style={{ fontFamily: head, fontWeight: 400, fontSize: "clamp(30px,4vw,52px)", margin: "10px 0 0" }}>Новинки</h2></div>
          <span className="navlink" onClick={() => go("catalog", "bags")} style={{ fontFamily: head, fontSize: 15, color: C.ink, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>Весь каталог <ArrowRight size={14} /></span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 60 }} className="newin-grid">{LOTS.slice(0, 4).map((lot, i) => <Card key={lot.id} lot={lot} i={i} tag={false} fav={favs.has(lot.id)} onFav={onFav} onOpen={setOpen} />)}</div>
      </section>

      {/* QUOTE */}
      <section className="quote-sec" style={{ background: C.panel, position: "relative", left: "50%", transform: "translateX(-50%)", width: "100vw", maxWidth: "100vw", margin: "clamp(48px,6vw,90px) 0", minHeight: 380, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "32px 20px", textAlign: "center" }}>
          <svg width="72" height="72" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", margin: "0 auto" }}><rect width="80" height="80" fill="black" /><path d="M24.1167 26C27.4667 26.1667 34.7251 26.9 36.9585 28.5C39.7502 31.5 37.5168 42 23 55C26.9084 47.5 31.3751 35.5 24.1167 26Z" fill="white" /><path d="M42.1167 26C45.4667 26.1667 52.7251 26.9 54.9585 28.5C57.7502 31.5 55.5168 42 41 55C44.9084 47.5 49.3751 35.5 42.1167 26Z" fill="white" /></svg>
          <p style={{ fontFamily: head, fontWeight: 400, fontSize: "clamp(16px,3.6vw,34px)", lineHeight: 1.3, color: C.ink, margin: "clamp(28px,3.8vw,44px) 0 0" }}>«За каждой находкой – чья-то долгая мечта.<br />Мы относимся к ней так же».</p>
          <div style={{ marginTop: "clamp(14px,2.4vw,22px)" }}><div style={{ fontWeight: 400, fontSize: 26, letterSpacing: 0.5 }}><span style={{ fontFamily: head, color: C.ink }}>Irena</span> <span style={{ fontFamily: mont, color: C.ink2, fontSize: 18 }}>| Находки</span></div></div>
        </div>
      </section>

      {/* COLLECTIONS */}
      <Collections go={go} goCollection={goCollection} />

      {/* AUTHENTICITY TEASER */}
      <section onClick={() => go("authenticity")} aria-label="Подлинность" style={{ cursor: "pointer", position: "relative", left: "50%", transform: "translateX(-50%)", width: "100vw", maxWidth: "100vw", height: "clamp(400px,46vw,560px)", overflow: "hidden", margin: "clamp(44px,6vw,86px) 0" }}>
        <img loading="lazy" decoding="async" src={ENTRUPY_BANNER} alt="Проверка Chanel прибором Entrupy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(42,36,34,0.05) 0%, rgba(42,36,34,0.22) 38%, rgba(42,36,34,0.60) 66%, rgba(42,36,34,0.90) 100%)" }} />
        <div className="wrap" style={{ position: "relative", maxWidth: 1340, margin: "0 auto", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-end" }}>
          <div style={{ maxWidth: 540 }}>
            <div style={{ ...label, color: "rgba(255,255,255,.7)" }}>Подлинность</div>
            <h2 style={{ fontFamily: head, fontWeight: 400, fontSize: "clamp(30px,4.4vw,58px)", lineHeight: 1.04, margin: "16px 0 0", color: "#fff" }}>Entrupy и экспертиза ювелира</h2>
            <p style={{ fontFamily: body, fontWeight: 300, fontSize: "clamp(15px,1.6vw,18px)", lineHeight: 1.7, color: "rgba(255,255,255,0.82)", margin: "18px 0 30px", maxWidth: 460 }}>Сумки – аппаратная проверка Entrupy с сертификатом. Украшения – экспертиза доверенного ювелира.</p>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 12, fontFamily: body, fontWeight: 300, fontSize: 15, letterSpacing: ".04em", color: "#fff", borderBottom: "1px solid rgba(255,255,255,0.4)", paddingBottom: 4 }}>Как это работает <ArrowRight size={15} /></span>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="wrap" style={{ maxWidth: 1340, margin: "0 auto", padding: "clamp(10px,2vw,24px) 0 clamp(50px,7vw,90px)" }}>
        <div style={{ ...label, color: C.accent, textAlign: "center" }}>Как это устроено</div>
        <div className="g3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(24px,4vw,64px)", marginTop: "clamp(28px,4vw,46px)" }}>
          {[["01", "Заявка", "Пишете Ирине или оставляете запрос ниже – обсуждаем вещь, комплект и стоимость."], ["02", "Выкуп и проверка", "Выкупаем и проверяем: Entrupy для сумок, ювелир – для украшений."], ["03", "Передача", "Привозим и передаём лично или застрахованной доставкой."]].map(([n, t, d]) => (
            <div key={n}>
              <div style={{ fontFamily: head, fontWeight: 400, fontSize: 30, lineHeight: 1, color: C.accent }}>{n}</div>
              <div style={{ height: 2, background: C.line, margin: "14px 0" }} />
              <div style={{ fontFamily: head, fontWeight: 400, fontSize: 17, color: C.ink, marginBottom: 6 }}>{t}</div>
              <div style={{ fontFamily: body, fontWeight: 300, fontSize: 14, lineHeight: 1.6, color: C.ink2 }}>{d}</div>
            </div>))}
        </div>
      </section>

      <SearchRequest />
    </>)}

    {/* CATALOG */}
    {view === "catalog" && (
      <section className="wrap" style={{ maxWidth: 1340, margin: "0 auto", padding: "clamp(160px,19vw,215px) 0 clamp(70px,10vw,130px)" }}>
        <div style={{ background: C.card, display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", overflow: "hidden", marginBottom: "clamp(32px,5vw,56px)" }} className="two">
          <div style={{ padding: "clamp(28px,4vw,56px)" }}><h1 style={{ fontFamily: head, fontWeight: 400, fontSize: "clamp(32px,4.6vw,58px)", margin: 0, color: C.ink }}>{cat === "bags" ? "Сумки" : "Украшения"}</h1><p style={{ fontFamily: body, fontWeight: 300, fontSize: 16, lineHeight: 1.7, color: C.ink2, margin: "14px 0 0", maxWidth: 360 }}>{cat === "bags" ? "Курируемая подборка сумок под заказ, с проверкой подлинности Entrupy." : "Украшения с экспертизой доверенного ювелира и полировкой перед отправкой."}</p></div>
          <div style={{ height: "clamp(220px, 22vw, 330px)", overflow: "hidden", background: "#fff" }}>{cat === "bags" ? <LotImage lot={LOTS[0]} big /> : <img loading="lazy" decoding="async" src={JBANNER} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", gap: 28 }}>{[["bags", "Сумки"], ["jewelry", "Украшения"]].map(([k, l]) => <button key={k} onClick={() => setCat(k)} style={{ fontFamily: head, fontSize: "clamp(20px,2.2vw,27px)", background: "none", border: "none", borderBottom: "2px solid " + (cat === k ? C.accent : "transparent"), padding: "0 0 6px", cursor: "pointer", color: cat === k ? C.ink : C.ink2, transition: "color .25s" }}>{l}<span style={{ fontSize: "0.6em", color: C.ink2, marginLeft: 7 }}>({LOTS.filter((x) => x.cat === k).length})</span></button>)}</div>
          <div className="toolbar-right" style={{ display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap" }}><button onClick={() => setFiltersOpen(true)} className="btn-secondary filters-btn" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9, background: "none", border: "1px solid " + C.stroke, cursor: "pointer", padding: "12px 18px", fontFamily: head, fontSize: 14.5, color: C.ink }}><SlidersHorizontal size={15} strokeWidth={1.5} /> Фильтры и сортировка{activeCount > 0 ? <span style={{ background: C.accent, color: "#fff", fontFamily: mont, fontSize: 10.5, width: 18, height: 18, borderRadius: 10, display: "inline-grid", placeItems: "center" }}>{activeCount}</span> : null}</button><div className="sort-inline" style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ fontFamily: body, fontSize: 15, color: C.ink2 }}>Сортировка:</span><Dropdown value={sort} onChange={setSort} options={[{ v: "new", l: "По умолчанию" }, { v: "asc", l: "Цена: по возрастанию" }, { v: "desc", l: "Цена: по убыванию" }]} /></div></div>
        </div>
        {filtersOpen && (<div style={{ position: "fixed", inset: 0, zIndex: 150, background: C.bg, overflowY: "auto", animation: "fadeIn .3s ease" }}>
          <aside style={{ maxWidth: 680, margin: "0 auto", padding: "clamp(26px,4vw,54px) clamp(20px,5vw,40px) 24px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}><div style={{ fontFamily: head, fontWeight: 400, fontSize: 24, color: C.ink }}>Фильтры</div><span onClick={() => setFiltersOpen(false)} className="ico" style={{ cursor: "pointer", display: "inline-flex" }} aria-label="Закрыть фильтры"><X size={22} strokeWidth={1.4} /></span></div>
            <div style={{ borderBottom: "1px solid " + C.line, paddingBottom: 14 }}>
              <div style={{ fontFamily: head, fontWeight: 500, fontSize: 17, color: C.ink, padding: "6px 0 10px" }}>Сортировка</div>
              {[{ v: "new", l: "По умолчанию" }, { v: "asc", l: "Цена: по возрастанию" }, { v: "desc", l: "Цена: по убыванию" }].map((o) => (<label key={o.v} onClick={() => setSort(o.v)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", cursor: "pointer", fontFamily: body, fontWeight: 300, fontSize: 14.5, color: sort === o.v ? C.ink : C.ink2 }}><span style={{ width: 16, height: 16, borderRadius: 10, border: "1px solid " + (sort === o.v ? C.accent : C.stroke), display: "grid", placeItems: "center", flexShrink: 0 }}>{sort === o.v ? <span style={{ width: 8, height: 8, borderRadius: 6, background: C.accent }} /> : null}</span>{o.l}</label>))}
            </div>
            {filterGroups}
            <div style={{ position: "sticky", bottom: 0, background: C.bg, paddingTop: 12, marginTop: 24 }}><button onClick={() => setFiltersOpen(false)} style={{ ...btnInk, width: "100%", justifyContent: "center" }} className="btn-primary">Показать{list.length > 0 ? " (" + list.length + ")" : ""}</button></div>
          </aside>
        </div>)}
        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "clamp(28px,4vw,56px)", alignItems: "start" }} className="cat-grid">
          <aside className="cat-aside">{filterGroups}</aside>
          <div>
            {list.length === 0 ? (<div style={{ padding: "60px 0", color: C.ink2, fontFamily: body }}>По выбранным фильтрам ничего нет. <button onClick={() => setFilters({ brands: [], collections: [], types: [], conditions: [], metals: [], price: [] })} style={{ background: "none", border: "none", color: C.accent, cursor: "pointer", fontFamily: body, fontSize: 14, textDecoration: "underline" }}>Сбросить</button></div>)
              : (<div key={cat + "|" + sort + "|" + cur + "|" + JSON.stringify(filters)} style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(16px,2vw,28px)", animation: "fadeIn .45s ease" }} className="grid-c">{paged.map((lot, i) => <Card key={lot.id} lot={lot} i={i} fav={favs.has(lot.id)} onFav={onFav} onOpen={setOpen} />)}</div>)}
            {list.length > 0 && <Pager page={cur} pages={pageCount} onPage={setPage} />}
          </div>
        </div>
      </section>
    )}

    {view === "authenticity" && <Authenticity go={go} />}
    {view === "account" && <Account favs={favs} onFav={onFav} onOpen={setOpen} go={go} />}

    {/* FOOTER */}
    <Footer go={go} />

    {open && <ProductView key={open.id} goBrand={goBrand} lot={open} fav={favs.has(open.id)} favs={favs} onFav={onFav} onOpen={setOpen} onClose={() => setOpen(null)} onAuth={() => { setOpen(null); go("authenticity"); }} go={go} onSearch={() => setSearchOpen(true)} />}
    {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} favs={favs} onFav={onFav} onOpen={(l) => { setSearchOpen(false); setOpen(l); }} recent={recentSearches} onRemember={rememberSearch} onClearRecent={() => setRecentSearches([])} />}
  </div>);
}
