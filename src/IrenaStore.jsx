"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import NextImage from "next/image";
import { ArrowRight, SlidersHorizontal, X } from "lucide-react";
import { Card } from "./components/catalog/Card";
import { Collections } from "./components/catalog/Collections";
import { LotImage } from "./components/catalog/LotImage";
import { CircleArrow, Sparkle } from "./components/icons/index";
import { Footer } from "./components/layout/Footer";
import { SiteHeader } from "./components/layout/SiteHeader";
import { ProductView } from "./components/lot/ProductView";
import { Account } from "./components/sections/Account";
import { Authenticity } from "./components/sections/Authenticity";
import { HeroMedia } from "./components/sections/HeroMedia";
import { SearchOverlay } from "./components/sections/SearchOverlay";
import { SearchRequest } from "./components/sections/SearchRequest";
import { Checkbox } from "./components/ui/Checkbox";
import { Dropdown } from "./components/ui/Dropdown";
import { FilterGroup } from "./components/ui/FilterGroup";
import { Pager } from "./components/ui/Pager";
import { BAG_BRANDS, CONDITIONS, JEWELRY_BRANDS, PRICE } from "./constants/catalog";
import { ENTRUPY_BANNER, HERO_IMAGES, JBANNER } from "./constants/media";
import { MARQUEE } from "./constants/site";
import { C, body, head, label, mont } from "./constants/theme";
import { useHideOnScroll } from "./hooks/useHideOnScroll";
import { LotsProvider } from "./context/LotsContext";
import { btnInk } from "./constants/theme";
export default function App({
  lots = [],
  initialView = "home",
  initialCat = "bags",
  initialLot = null,
}) {
  const LOTS = lots;
  const [view, setView] = useState(initialView);
  const [cat, setCat] = useState(initialCat);
  const [sort, setSort] = useState("new");
  const [filters, setFilters] = useState({
    brands: [],
    collections: [],
    types: [],
    conditions: [],
    metals: [],
    price: [],
  });
  const [favs, setFavs] = useState(new Set());
  const [open, setOpen] = useState(initialLot);
  const [searchOpen, setSearchOpen] = useState(false);
  const firstSync = useRef(true);
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const b = q.get("brand");
    const col = q.get("collection");
    if (b || col)
      setFilters((f) => ({
        ...f,
        brands: b ? [b] : f.brands,
        collections: col ? [col] : f.collections,
      }));
  }, [LOTS]);
  const pathFor = useCallback((v, c, o, f) => {
    if (o) return "/lot/" + o.id;
    if (v === "catalog") {
      const q = [];
      if (f && f.collections && f.collections.length === 1)
        q.push("collection=" + encodeURIComponent(f.collections[0]));
      if (f && f.brands && f.brands.length === 1)
        q.push("brand=" + encodeURIComponent(f.brands[0]));
      return "/catalog/" + c + (q.length ? "?" + q.join("&") : "");
    }
    if (v === "authenticity") return "/authenticity";
    if (v === "account") return "/account";
    return "/";
  }, []);
  useEffect(() => {
    const path = pathFor(view, cat, open, filters);
    if (typeof window === "undefined") return;
    if (firstSync.current) {
      firstSync.current = false;
      window.history.replaceState({ view, cat, lotId: open ? open.id : null }, "", path);
      return;
    }
    if (window.location.pathname + window.location.search !== path)
      window.history.pushState({ view, cat, lotId: open ? open.id : null }, "", path);
  }, [view, cat, open, filters, pathFor]);
  useEffect(() => {
    const onPop = () => {
      const p = window.location.pathname;
      const mLot = p.match(/^\/lot\/(.+)$/);
      if (mLot) {
        const l = LOTS.find((x) => x.id === mLot[1]);
        setOpen(l || null);
        if (l) setCat(l.cat);
        return;
      }
      setOpen(null);
      const mCat = p.match(/^\/catalog\/(bags|jewelry)$/);
      if (mCat) {
        const q = new URLSearchParams(window.location.search);
        setCat(mCat[1]);
        setFilters({
          brands: q.get("brand") ? [q.get("brand")] : [],
          collections: q.get("collection") ? [q.get("collection")] : [],
          types: [],
          conditions: [],
          metals: [],
          price: [],
        });
        setView("catalog");
        return;
      }
      if (p === "/authenticity") {
        setView("authenticity");
        return;
      }
      if (p === "/account") {
        setView("account");
        return;
      }
      setView("home");
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [LOTS]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  useEffect(() => {
    if (filtersOpen) {
      const sbw = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (sbw > 0) {
        document.body.style.paddingRight = sbw + "px";
        const hd = document.querySelector(".site-head");
        if (hd) hd.style.paddingRight = sbw + "px";
      }
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      const hd = document.querySelector(".site-head");
      if (hd) hd.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      const hd = document.querySelector(".site-head");
      if (hd) hd.style.paddingRight = "";
    };
  }, [filtersOpen]);
  const [recentSearches, setRecentSearches] = useState([]);
  const rememberSearch = useCallback((q) => {
    const t = (q || "").trim();
    if (t.length < 2) return;
    setRecentSearches((p) =>
      [t, ...p.filter((x) => x.toLowerCase() !== t.toLowerCase())].slice(0, 6)
    );
  }, []);
  const [page, setPage] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const hidden = useHideOnScroll();
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 70);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    const hd = document.querySelector(".site-head");
    if (hd) {
      hd.style.transition = "none";
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          hd.style.transition = "";
        })
      );
    }
    window.scrollTo(0, 0);
  }, [view]);
  useEffect(() => {
    setPage(1);
  }, [cat, sort, filters]);
  const onFav = useCallback(
    (id) =>
      setFavs((p) => {
        const n = new Set(p);
        n.has(id) ? n.delete(id) : n.add(id);
        return n;
      }),
    []
  );
  const go = (v, c) => {
    if (c) {
      setCat(c);
      setFilters({ brands: [], collections: [], types: [], conditions: [], metals: [], price: [] });
    }
    setView(v);
    setFiltersOpen(false);
  };
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
  useEffect(() => {
    window.__scrollToId = (id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const hd = document.querySelector(".site-head");
      const off = window.innerWidth <= 900 && hd ? hd.offsetHeight + 6 : 10;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.pageYOffset - off,
        behavior: "smooth",
      });
    };
    window.__goSearchForm = () => {
      setOpen(null);
      setView("home");
      setTimeout(() => window.__scrollToId && window.__scrollToId("sr"), 160);
    };
    return () => {
      delete window.__goSearchForm;
      delete window.__scrollToId;
    };
  }, []);
  const toggle = (key, val) =>
    setFilters((f) => ({
      ...f,
      [key]: f[key].includes(val) ? f[key].filter((x) => x !== val) : [...f[key], val],
    }));
  const brandOpts = cat === "bags" ? BAG_BRANDS : JEWELRY_BRANDS;
  const collectionOpts = useMemo(
    () =>
      [
        ...new Set(
          LOTS.filter((l) => l.cat === cat && l.collection).map((l) => String(l.collection).trim())
        ),
      ].sort((a, b) => a.localeCompare(b, "ru")),
    [LOTS, cat]
  );
  const typeOpts = useMemo(() => {
    const order = [
      "Мини-сумки",
      "Клатчи и пошетты",
      "Сумки через плечо",
      "Тоуты",
      "Рюкзаки",
      "Дорожные сумки",
      "Колье",
      "Браслеты",
      "Серьги",
      "Кольца",
    ];
    const found = [...new Set(LOTS.filter((l) => l.cat === cat && l.type).map((l) => l.type))];
    return found.sort((a, b) => {
      const ia = order.indexOf(a),
        ib = order.indexOf(b);
      if (ia !== -1 && ib !== -1) return ia - ib;
      if (ia !== -1) return -1;
      if (ib !== -1) return 1;
      return a.localeCompare(b, "ru");
    });
  }, [LOTS, cat]);
  const condOpts = CONDITIONS;
  const metalOpts = useMemo(
    () =>
      cat === "jewelry"
        ? [...new Set(LOTS.filter((l) => l.cat === cat && l.metal).map((l) => l.metal))].sort()
        : [],
    [LOTS, cat]
  );
  const list = useMemo(() => {
    let l = LOTS.filter((x) => x.cat === cat);
    if (filters.brands.length) l = l.filter((x) => filters.brands.includes(x.brand));
    if (filters.collections.length) l = l.filter((x) => filters.collections.includes(x.collection));
    if (filters.types.length) l = l.filter((x) => filters.types.includes(x.type));
    if (filters.conditions.length) l = l.filter((x) => filters.conditions.includes(x.condition));
    if (filters.metals.length) l = l.filter((x) => filters.metals.includes(x.metal));
    if (filters.price.length)
      l = l.filter((x) =>
        filters.price.some((pi) => {
          const p = PRICE[pi];
          return x.price >= p[1] && x.price < p[2];
        })
      );
    if (sort === "asc") l = [...l].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    if (sort === "desc") l = [...l].sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
    return l;
  }, [LOTS, cat, sort, filters]);
  const anyFilter =
    filters.brands.length ||
    filters.collections.length ||
    filters.types.length ||
    filters.conditions.length ||
    filters.metals.length ||
    filters.price.length;
  const activeCount =
    filters.brands.length +
    filters.collections.length +
    filters.types.length +
    filters.conditions.length +
    filters.metals.length +
    filters.price.length;
  const filterGroups = (
    <>
      <FilterGroup title="Бренд" limit={7}>
        {brandOpts.map((b) => (
          <Checkbox
            key={b}
            ff={mont}
            on={filters.brands.includes(b)}
            onClick={() => toggle("brands", b)}
          >
            {b}
          </Checkbox>
        ))}
      </FilterGroup>
      {collectionOpts.length > 0 && (
        <FilterGroup title="Коллекция" limit={7} defaultOpen={false}>
          {collectionOpts.map((c) => (
            <Checkbox
              key={c}
              ff={mont}
              on={filters.collections.includes(c)}
              onClick={() => toggle("collections", c)}
            >
              {c}
            </Checkbox>
          ))}
        </FilterGroup>
      )}
      {typeOpts.length > 0 && (
        <FilterGroup title="Категория">
          {typeOpts.map((t) => (
            <Checkbox key={t} on={filters.types.includes(t)} onClick={() => toggle("types", t)}>
              {t}
            </Checkbox>
          ))}
        </FilterGroup>
      )}
      {metalOpts.length > 0 && (
        <FilterGroup title="Металл">
          {metalOpts.map((m) => (
            <Checkbox key={m} on={filters.metals.includes(m)} onClick={() => toggle("metals", m)}>
              {m}
            </Checkbox>
          ))}
        </FilterGroup>
      )}
      <FilterGroup title="Состояние">
        {condOpts.map((c) => (
          <Checkbox
            key={c}
            on={filters.conditions.includes(c)}
            onClick={() => toggle("conditions", c)}
          >
            {c}
          </Checkbox>
        ))}
      </FilterGroup>
      {LOTS.some((l) => l.price != null) && (
        <FilterGroup title="Цена">
          {PRICE.map((p, idx) => (
            <Checkbox
              key={p[0]}
              on={filters.price.includes(idx)}
              onClick={() => toggle("price", idx)}
            >
              {p[0]}
            </Checkbox>
          ))}
        </FilterGroup>
      )}
      {anyFilter ? (
        <button
          onClick={() =>
            setFilters({
              brands: [],
              collections: [],
              types: [],
              conditions: [],
              metals: [],
              price: [],
            })
          }
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "none",
            border: "none",
            cursor: "pointer",
            marginTop: 18,
            ...label,
            fontSize: 11,
            color: C.accent,
          }}
        >
          <X size={13} /> Сбросить фильтры
        </button>
      ) : null}
    </>
  );
  const PAGE_SIZE = 6;
  const pageCount = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const cur = Math.min(page, pageCount);
  const paged = list.slice((cur - 1) * PAGE_SIZE, cur * PAGE_SIZE);
  return (
    <LotsProvider lots={lots}>
      <div
        style={{
          background: C.bg,
          color: C.ink,
          fontFamily: body,
          minHeight: "calc(100vh + 1px)",
          position: "relative",
        }}
      >
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
      .crumb{color:${C.ink2};font-family:${mont};font-size:13px;background:none;border:none;padding:0;cursor:pointer;transition:color .2s;}
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
        <SiteHeader
          go={go}
          favs={favs}
          floating
          hidden={hidden}
          onSearch={() => setSearchOpen(true)}
        />
        {view === "home" && (
          <>
            {/* HERO */}
            <section
              className="hero-sec"
              style={{
                position: "relative",
                height: "clamp(560px, 67.7vw, 1300px)",
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <Sparkle size={108} style={{ position: "absolute", top: "11%", right: "7%" }} />
              <Sparkle size={86} style={{ position: "absolute", bottom: "11%", left: "39%" }} />
              <Sparkle size={46} style={{ position: "absolute", top: "54%", left: "3%" }} />
              <div
                className="wrap"
                style={{
                  maxWidth: 1340,
                  margin: "0 auto",
                  padding: "clamp(150px,18vw,208px) 0 clamp(48px,5vw,72px)",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 40,
                    alignItems: "center",
                  }}
                  className="hero-grid"
                >
                  <div
                    style={{
                      opacity: loaded ? 1 : 0,
                      animation: loaded ? "rise 1s cubic-bezier(.16,.8,.3,1) both" : "none",
                    }}
                  >
                    <div style={{ ...label, color: C.accent, marginBottom: 22 }}>
                      Под заказ · с проверкой подлинности
                    </div>
                    <h1
                      style={{
                        fontFamily: head,
                        fontWeight: 400,
                        fontSize: "clamp(46px,7vw,104px)",
                        lineHeight: 1.0,
                        margin: 0,
                        color: C.ink,
                      }}
                    >
                      Находки,
                      <br />
                      отобранные
                      <br />
                      лично
                    </h1>
                    <p
                      style={{
                        fontFamily: body,
                        fontWeight: 300,
                        fontSize: 17,
                        lineHeight: 1.7,
                        color: C.ink2,
                        margin: "28px 0 40px",
                        maxWidth: 380,
                      }}
                    >
                      Подлинные сумки и украшения под заказ – отбор Ирины, проверка Entrupy и
                      ювелира.
                    </p>
                    <CircleArrow label="Смотреть подборку" onClick={() => go("catalog", "bags")} />
                    <div style={{ marginTop: 24 }}>
                      <span
                        onClick={() => {
                          window.__scrollToId && window.__scrollToId("sr");
                        }}
                        style={{
                          fontFamily: body,
                          fontWeight: 300,
                          fontSize: 15,
                          color: C.ink2,
                          cursor: "pointer",
                          borderBottom: "1px solid " + C.line,
                          paddingBottom: 3,
                        }}
                        className="hov"
                      >
                        Или найдём под заказ – расскажите, что ищете
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: 460,
                    }}
                  >
                    <HeroMedia images={HERO_IMAGES} />
                  </div>
                </div>
              </div>
            </section>
            {/* BRAND MARQUEE – заменить текст на реальные лого (img) когда будут файлы */}
            <section
              className="marquee"
              style={{
                borderTop: "1px solid " + C.line,
                borderBottom: "1px solid " + C.line,
                overflow: "hidden",
                padding: "clamp(30px,4vw,52px) 0",
              }}
            >
              <div className="mq">
                {[0, 1].map((rep) => (
                  <div
                    key={rep}
                    style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
                    aria-hidden={rep === 1}
                  >
                    {MARQUEE.map((b) => (
                      <span key={b + rep} style={{ display: "inline-flex", alignItems: "center" }}>
                        <span
                          style={{
                            fontFamily: head,
                            fontWeight: 400,
                            fontSize: "clamp(20px,2.4vw,30px)",
                            letterSpacing: 2,
                            color: "rgba(42,36,34,.42)",
                            padding: "0 clamp(28px,4vw,60px)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {b}
                        </span>
                        <span
                          style={{
                            width: 5,
                            height: 5,
                            transform: "rotate(45deg)",
                            background: "rgba(42,36,34,.22)",
                            flexShrink: 0,
                          }}
                        />
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </section>
            {/* SELECTION */}
            <section
              className="wrap"
              style={{ maxWidth: 1340, margin: "0 auto", padding: "clamp(60px,9vw,130px) 0" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  marginBottom: "clamp(32px,4vw,52px)",
                }}
              >
                <div>
                  <div style={{ ...label, color: C.accent }}>Доступно сейчас</div>
                  <h2
                    style={{
                      fontFamily: head,
                      fontWeight: 400,
                      fontSize: "clamp(30px,4vw,52px)",
                      margin: "10px 0 0",
                    }}
                  >
                    Новинки
                  </h2>
                </div>
                <span
                  className="navlink"
                  onClick={() => go("catalog", "bags")}
                  style={{
                    fontFamily: head,
                    fontSize: 15,
                    color: C.ink,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  Весь каталог <ArrowRight size={14} />
                </span>
              </div>
              <div
                style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 60 }}
                className="newin-grid"
              >
                {LOTS.slice(0, 4).map((lot, i) => (
                  <Card
                    key={lot.id}
                    lot={lot}
                    i={i}
                    tag={false}
                    fav={favs.has(lot.id)}
                    onFav={onFav}
                    onOpen={setOpen}
                  />
                ))}
              </div>
            </section>
            {/* QUOTE */}
            <section
              className="quote-sec"
              style={{
                background: C.panel,
                position: "relative",
                left: "50%",
                transform: "translateX(-50%)",
                width: "100vw",
                maxWidth: "100vw",
                margin: "clamp(48px,6vw,90px) 0",
                minHeight: 380,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  maxWidth: 760,
                  margin: "0 auto",
                  padding: "32px 20px",
                  textAlign: "center",
                }}
              >
                <svg
                  width="72"
                  height="72"
                  viewBox="0 0 80 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ display: "block", margin: "0 auto" }}
                >
                  <rect width="80" height="80" fill="black" />
                  <path
                    d="M24.1167 26C27.4667 26.1667 34.7251 26.9 36.9585 28.5C39.7502 31.5 37.5168 42 23 55C26.9084 47.5 31.3751 35.5 24.1167 26Z"
                    fill="white"
                  />
                  <path
                    d="M42.1167 26C45.4667 26.1667 52.7251 26.9 54.9585 28.5C57.7502 31.5 55.5168 42 41 55C44.9084 47.5 49.3751 35.5 42.1167 26Z"
                    fill="white"
                  />
                </svg>
                <p
                  style={{
                    fontFamily: head,
                    fontWeight: 400,
                    fontSize: "clamp(16px,3.6vw,34px)",
                    lineHeight: 1.3,
                    color: C.ink,
                    margin: "clamp(28px,3.8vw,44px) 0 0",
                  }}
                >
                  «За каждой находкой – чья-то долгая мечта.
                  <br />
                  Мы относимся к ней так же».
                </p>
                <div style={{ marginTop: "clamp(14px,2.4vw,22px)" }}>
                  <div
                    style={{
                      position: "relative",
                      fontWeight: 400,
                      fontSize: 26,
                      letterSpacing: 0.5,
                    }}
                  >
                    <span style={{ fontFamily: head, color: C.ink }}>Irena</span>{" "}
                    <span style={{ fontFamily: mont, color: C.ink2, fontSize: 18 }}>| Находки</span>
                  </div>
                </div>
              </div>
            </section>
            {/* COLLECTIONS */}
            <Collections go={go} goCollection={goCollection} />
            {/* AUTHENTICITY TEASER */}
            <section
              onClick={() => go("authenticity")}
              aria-label="Подлинность"
              style={{
                cursor: "pointer",
                position: "relative",
                left: "50%",
                transform: "translateX(-50%)",
                width: "100vw",
                maxWidth: "100vw",
                height: "clamp(400px,46vw,560px)",
                overflow: "hidden",
                margin: "clamp(44px,6vw,86px) 0",
              }}
            >
              <NextImage
                fill
                sizes="(max-width: 768px) 100vw, 900px"
                src={ENTRUPY_BANNER}
                alt="Проверка Chanel прибором Entrupy"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(90deg, rgba(42,36,34,0.05) 0%, rgba(42,36,34,0.22) 38%, rgba(42,36,34,0.60) 66%, rgba(42,36,34,0.90) 100%)",
                }}
              />
              <div
                className="wrap"
                style={{
                  position: "relative",
                  maxWidth: 1340,
                  margin: "0 auto",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <div style={{ maxWidth: 540 }}>
                  <div style={{ ...label, color: "rgba(255,255,255,.7)" }}>Подлинность</div>
                  <h2
                    style={{
                      fontFamily: head,
                      fontWeight: 400,
                      fontSize: "clamp(30px,4.4vw,58px)",
                      lineHeight: 1.04,
                      margin: "16px 0 0",
                      color: "#fff",
                    }}
                  >
                    Entrupy и экспертиза ювелира
                  </h2>
                  <p
                    style={{
                      fontFamily: body,
                      fontWeight: 300,
                      fontSize: "clamp(15px,1.6vw,18px)",
                      lineHeight: 1.7,
                      color: "rgba(255,255,255,0.82)",
                      margin: "18px 0 30px",
                      maxWidth: 460,
                    }}
                  >
                    Сумки – аппаратная проверка Entrupy с сертификатом. Украшения – экспертиза
                    доверенного ювелира.
                  </p>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 12,
                      fontFamily: body,
                      fontWeight: 300,
                      fontSize: 15,
                      letterSpacing: ".04em",
                      color: "#fff",
                      borderBottom: "1px solid rgba(255,255,255,0.4)",
                      paddingBottom: 4,
                    }}
                  >
                    Как это работает <ArrowRight size={15} />
                  </span>
                </div>
              </div>
            </section>
            {/* HOW IT WORKS */}
            <section
              id="how"
              className="wrap"
              style={{
                maxWidth: 1340,
                margin: "0 auto",
                padding: "clamp(10px,2vw,24px) 0 clamp(50px,7vw,90px)",
              }}
            >
              <div style={{ ...label, color: C.accent, textAlign: "center" }}>Как это устроено</div>
              <div
                className="g3"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3,1fr)",
                  gap: "clamp(24px,4vw,64px)",
                  marginTop: "clamp(28px,4vw,46px)",
                }}
              >
                {[
                  [
                    "01",
                    "Заявка",
                    "Пишете Ирине или оставляете запрос ниже – обсуждаем вещь, комплект и стоимость.",
                  ],
                  [
                    "02",
                    "Выкуп и проверка",
                    "Выкупаем и проверяем: Entrupy для сумок, ювелир – для украшений.",
                  ],
                  ["03", "Передача", "Привозим и передаём лично или застрахованной доставкой."],
                ].map(([n, t, d]) => (
                  <div key={n}>
                    <div
                      style={{
                        fontFamily: head,
                        fontWeight: 400,
                        fontSize: 30,
                        lineHeight: 1,
                        color: C.accent,
                      }}
                    >
                      {n}
                    </div>
                    <div style={{ height: 2, background: C.line, margin: "14px 0" }} />
                    <div
                      style={{
                        fontFamily: head,
                        fontWeight: 400,
                        fontSize: 17,
                        color: C.ink,
                        marginBottom: 6,
                      }}
                    >
                      {t}
                    </div>
                    <div
                      style={{
                        fontFamily: body,
                        fontWeight: 300,
                        fontSize: 14,
                        lineHeight: 1.6,
                        color: C.ink2,
                      }}
                    >
                      {d}
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <SearchRequest />
          </>
        )}
        {/* CATALOG */}
        {view === "catalog" && (
          <section
            className="wrap"
            style={{
              maxWidth: 1340,
              margin: "0 auto",
              padding: "clamp(160px,19vw,215px) 0 clamp(70px,10vw,130px)",
            }}
          >
            <div
              style={{
                background: C.card,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                alignItems: "center",
                overflow: "hidden",
                marginBottom: "clamp(32px,5vw,56px)",
              }}
              className="two"
            >
              <div style={{ padding: "clamp(28px,4vw,56px)" }}>
                <h1
                  style={{
                    fontFamily: head,
                    fontWeight: 400,
                    fontSize: "clamp(32px,4.6vw,58px)",
                    margin: 0,
                    color: C.ink,
                  }}
                >
                  {cat === "bags" ? "Сумки" : "Украшения"}
                </h1>
                <p
                  style={{
                    fontFamily: body,
                    fontWeight: 300,
                    fontSize: 16,
                    lineHeight: 1.7,
                    color: C.ink2,
                    margin: "14px 0 0",
                    maxWidth: 360,
                  }}
                >
                  {cat === "bags"
                    ? "Курируемая подборка сумок под заказ, с проверкой подлинности Entrupy."
                    : "Украшения с экспертизой доверенного ювелира и полировкой перед отправкой."}
                </p>
              </div>
              <div
                style={{
                  position: "relative",
                  height: "clamp(220px, 22vw, 330px)",
                  overflow: "hidden",
                  background: "#fff",
                }}
              >
                {cat === "bags" ? (
                  <LotImage lot={LOTS[0]} big />
                ) : (
                  <NextImage
                    fill
                    sizes="(max-width: 768px) 100vw, 660px"
                    src={JBANNER}
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                )}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 28,
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <div style={{ display: "flex", gap: 28 }}>
                {[
                  ["bags", "Сумки"],
                  ["jewelry", "Украшения"],
                ].map(([k, l]) => (
                  <button
                    key={k}
                    onClick={() => {
                      setCat(k);
                      setFilters({
                        brands: [],
                        collections: [],
                        types: [],
                        conditions: [],
                        metals: [],
                        price: [],
                      });
                    }}
                    style={{
                      fontFamily: head,
                      fontSize: "clamp(20px,2.2vw,27px)",
                      background: "none",
                      border: "none",
                      borderBottom: "2px solid " + (cat === k ? C.accent : "transparent"),
                      padding: "0 0 6px",
                      cursor: "pointer",
                      color: cat === k ? C.ink : C.ink2,
                      transition: "color .25s",
                    }}
                  >
                    {l}
                    <span style={{ fontSize: "0.6em", color: C.ink2, marginLeft: 7 }}>
                      ({LOTS.filter((x) => x.cat === k).length})
                    </span>
                  </button>
                ))}
              </div>
              <div
                className="toolbar-right"
                style={{ display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap" }}
              >
                <button
                  onClick={() => setFiltersOpen(true)}
                  className="btn-secondary filters-btn"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 9,
                    background: "none",
                    border: "1px solid " + C.stroke,
                    cursor: "pointer",
                    padding: "12px 18px",
                    fontFamily: head,
                    fontSize: 14.5,
                    color: C.ink,
                  }}
                >
                  <SlidersHorizontal size={15} strokeWidth={1.5} /> Фильтры и сортировка
                  {activeCount > 0 ? (
                    <span
                      style={{
                        background: C.accent,
                        color: "#fff",
                        fontFamily: mont,
                        fontSize: 10.5,
                        width: 18,
                        height: 18,
                        borderRadius: 10,
                        display: "inline-grid",
                        placeItems: "center",
                      }}
                    >
                      {activeCount}
                    </span>
                  ) : null}
                </button>
                <div
                  className="sort-inline"
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                >
                  <span style={{ fontFamily: body, fontSize: 15, color: C.ink2 }}>Сортировка:</span>
                  <Dropdown
                    value={sort}
                    onChange={setSort}
                    options={[
                      { v: "new", l: "По умолчанию" },
                      { v: "asc", l: "Цена: по возрастанию" },
                      { v: "desc", l: "Цена: по убыванию" },
                    ]}
                  />
                </div>
              </div>
            </div>
            {filtersOpen && (
              <div
                style={{
                  position: "fixed",
                  inset: 0,
                  zIndex: 150,
                  background: C.bg,
                  overflowY: "auto",
                  animation: "fadeIn .3s ease",
                }}
              >
                <aside
                  style={{
                    maxWidth: 680,
                    margin: "0 auto",
                    padding: "clamp(26px,4vw,54px) clamp(20px,5vw,40px) 24px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 22,
                    }}
                  >
                    <div style={{ fontFamily: head, fontWeight: 400, fontSize: 24, color: C.ink }}>
                      Фильтры
                    </div>
                    <span
                      onClick={() => setFiltersOpen(false)}
                      className="ico"
                      style={{ cursor: "pointer", display: "inline-flex" }}
                      aria-label="Закрыть фильтры"
                    >
                      <X size={22} strokeWidth={1.4} />
                    </span>
                  </div>
                  <div style={{ borderBottom: "1px solid " + C.line, paddingBottom: 14 }}>
                    <div
                      style={{
                        fontFamily: head,
                        fontWeight: 500,
                        fontSize: 17,
                        color: C.ink,
                        padding: "6px 0 10px",
                      }}
                    >
                      Сортировка
                    </div>
                    {[
                      { v: "new", l: "По умолчанию" },
                      { v: "asc", l: "Цена: по возрастанию" },
                      { v: "desc", l: "Цена: по убыванию" },
                    ].map((o) => (
                      <label
                        key={o.v}
                        onClick={() => setSort(o.v)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "8px 0",
                          cursor: "pointer",
                          fontFamily: body,
                          fontWeight: 300,
                          fontSize: 14.5,
                          color: sort === o.v ? C.ink : C.ink2,
                        }}
                      >
                        <span
                          style={{
                            width: 16,
                            height: 16,
                            borderRadius: 10,
                            border: "1px solid " + (sort === o.v ? C.accent : C.stroke),
                            display: "grid",
                            placeItems: "center",
                            flexShrink: 0,
                          }}
                        >
                          {sort === o.v ? (
                            <span
                              style={{ width: 8, height: 8, borderRadius: 6, background: C.accent }}
                            />
                          ) : null}
                        </span>
                        {o.l}
                      </label>
                    ))}
                  </div>
                  {filterGroups}
                  <div
                    style={{
                      position: "sticky",
                      bottom: 0,
                      background: C.bg,
                      paddingTop: 12,
                      marginTop: 24,
                    }}
                  >
                    <button
                      onClick={() => setFiltersOpen(false)}
                      style={{ ...btnInk, width: "100%", justifyContent: "center" }}
                      className="btn-primary"
                    >
                      Показать{list.length > 0 ? " (" + list.length + ")" : ""}
                    </button>
                  </div>
                </aside>
              </div>
            )}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "240px 1fr",
                gap: "clamp(28px,4vw,56px)",
                alignItems: "start",
              }}
              className="cat-grid"
            >
              <aside className="cat-aside">{filterGroups}</aside>
              <div>
                {list.length === 0 ? (
                  <div style={{ padding: "60px 0", color: C.ink2, fontFamily: body }}>
                    По выбранным фильтрам ничего нет.{" "}
                    <button
                      onClick={() =>
                        setFilters({
                          brands: [],
                          collections: [],
                          types: [],
                          conditions: [],
                          metals: [],
                          price: [],
                        })
                      }
                      style={{
                        background: "none",
                        border: "none",
                        color: C.accent,
                        cursor: "pointer",
                        fontFamily: body,
                        fontSize: 14,
                        textDecoration: "underline",
                      }}
                    >
                      Сбросить
                    </button>
                  </div>
                ) : (
                  <div
                    key={cat + "|" + sort + "|" + cur + "|" + JSON.stringify(filters)}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3,1fr)",
                      gap: "clamp(16px,2vw,28px)",
                      animation: "fadeIn .45s ease",
                    }}
                    className="grid-c"
                  >
                    {paged.map((lot, i) => (
                      <Card
                        key={lot.id}
                        lot={lot}
                        i={i}
                        fav={favs.has(lot.id)}
                        onFav={onFav}
                        onOpen={setOpen}
                      />
                    ))}
                  </div>
                )}
                {list.length > 0 && <Pager page={cur} pages={pageCount} onPage={setPage} />}
              </div>
            </div>
          </section>
        )}
        {view === "authenticity" && <Authenticity go={go} />}
        {view === "account" && <Account favs={favs} onFav={onFav} onOpen={setOpen} go={go} />}
        {/* FOOTER */}
        <Footer go={go} />
        {open && (
          <ProductView
            key={open.id}
            goBrand={goBrand}
            lot={open}
            fav={favs.has(open.id)}
            favs={favs}
            onFav={onFav}
            onOpen={setOpen}
            onClose={() => setOpen(null)}
            onAuth={() => {
              setOpen(null);
              go("authenticity");
            }}
            go={go}
            onSearch={() => setSearchOpen(true)}
          />
        )}
        {searchOpen && (
          <SearchOverlay
            onClose={() => setSearchOpen(false)}
            favs={favs}
            onFav={onFav}
            onOpen={(l) => {
              setSearchOpen(false);
              setOpen(l);
            }}
            recent={recentSearches}
            onRemember={rememberSearch}
            onClearRecent={() => setRecentSearches([])}
          />
        )}
      </div>
    </LotsProvider>
  );
}
