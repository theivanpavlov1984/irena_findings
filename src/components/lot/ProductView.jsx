"use client";
import { useEffect, useState } from "react";
import { ArrowRight, Share2 } from "lucide-react";
import { Card } from "../catalog/Card";
import { LotImage } from "../catalog/LotImage";
import { HeartIcon } from "../icons/index";
import { Footer } from "../layout/Footer";
import { SiteHeader } from "../layout/SiteHeader";
import { Photo } from "../ui/Photo";
import { SPEC_LABELS, STATUS } from "../../constants/catalog";
import { IMG } from "../../constants/media";
import { TELEGRAM } from "../../constants/site";
import { C, body, btnInk, head, label, mont } from "../../constants/theme";
import { fmt } from "../../utils/format";
import { useLots } from "../../context/LotsContext";
import { btnGhost } from "../../constants/theme";
export function ProductView({
  lot,
  fav,
  favs,
  onFav,
  onOpen,
  onClose,
  onAuth,
  go,
  goBrand,
  onSearch,
}) {
  const LOTS = useLots();
  useEffect(() => {
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (sbw > 0) {
      document.body.style.paddingRight = sbw + "px";
      const hd = document.querySelector(".site-head");
      if (hd) hd.style.paddingRight = sbw + "px";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      const hd = document.querySelector(".site-head");
      if (hd) hd.style.paddingRight = "";
    };
  }, []);
  const showRetail = lot.retail && (lot.retail - lot.price) / lot.retail >= 0.4;
  const [lotUrl, setLotUrl] = useState("");
  useEffect(() => {
    setLotUrl(window.location.origin + "/lot/" + lot.id);
  }, [lot.id]);
  const tg =
    TELEGRAM +
    "?text=" +
    encodeURIComponent(
      "Здравствуйте, Ирина! Интересует " +
        lot.brand +
        " " +
        lot.model +
        (lot.price != null ? " – " + fmt(lot.price) : "") +
        "." +
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
      try {
        await navigator.share({ title, url });
      } catch (e) {}
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(title + "\n" + url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (e) {}
    }
  };
  const related = [
    ...LOTS.filter((l) => l.id !== lot.id && l.cat === lot.cat),
    ...LOTS.filter((l) => l.id !== lot.id && l.cat !== lot.cat),
  ].slice(0, 4);
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 120,
        background: C.bg,
        overflowY: "auto",
        animation: "fadeIn .35s ease",
      }}
    >
      <SiteHeader
        go={(v, c) => {
          onClose();
          go(v, c);
        }}
        favs={favs}
        onSearch={onSearch}
        sticky
      />
      <div className="wrap" style={{ maxWidth: 1340, margin: "0 auto", padding: "24px 0 90px" }}>
        <nav
          aria-label="Хлебные крошки"
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 9,
            padding: "6px 0 30px",
          }}
        >
          <button
            onClick={() => {
              onClose();
              go("home");
            }}
            className="crumb"
          >
            Главная
          </button>
          <span style={{ fontFamily: mont, fontSize: 13, color: C.ink2, opacity: 0.5 }}>/</span>
          <button
            onClick={() => {
              onClose();
              go("catalog", lot.cat);
            }}
            className="crumb"
          >
            Каталог
          </button>
          <span style={{ fontFamily: mont, fontSize: 13, color: C.ink2, opacity: 0.5 }}>/</span>
          <button
            onClick={() => {
              onClose();
              go("catalog", lot.cat);
            }}
            className="crumb"
          >
            {catLabel}
          </button>
          <span style={{ fontFamily: mont, fontSize: 13, color: C.ink2, opacity: 0.5 }}>/</span>
          <button
            onClick={() => {
              if (goBrand) goBrand(lot.cat, lot.brand);
            }}
            className="crumb"
          >
            {lot.brand}
          </button>
          <span style={{ fontFamily: mont, fontSize: 13, color: C.ink2, opacity: 0.5 }}>/</span>
          <span style={{ fontFamily: mont, fontSize: 13, color: C.ink }}>{lot.model}</span>
        </nav>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(28px,5vw,72px)",
            alignItems: "start",
          }}
          className="pv"
        >
          <div className="pv-media" style={{ position: "sticky", top: 24 }}>
            <div
              style={{
                background: "#fff",
                padding: "clamp(16px,3vw,40px)",
                border: "1px solid " + C.stroke,
              }}
            >
              <div
                key={ph}
                style={{ aspectRatio: "1", overflow: "hidden", animation: "fadeIn .5s ease" }}
              >
                <LotImage lot={lot} big idx={ph} />
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: 10,
                marginTop: 10,
              }}
            >
              {[0, 1, 2, 3].map((k) => {
                const has = lot.photos && k < lot.photos.length;
                return (
                  <div
                    key={k}
                    onClick={() => has && setPh(k)}
                    title={has ? undefined : "Скоро добавим больше фото"}
                    style={{
                      cursor: has ? "pointer" : "default",
                      background: has ? "#fff" : C.panel,
                      padding: has ? 8 : 0,
                      border: "1px solid " + (k === ph ? C.ink : C.stroke),
                      transition: "border-color .3s",
                    }}
                  >
                    <div
                      style={{
                        aspectRatio: "1",
                        overflow: "hidden",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      {has ? (
                        <LotImage lot={lot} idx={k} />
                      ) : (
                        <span
                          style={{
                            fontFamily: body,
                            fontSize: 22,
                            fontWeight: 300,
                            color: C.ink2,
                            opacity: 0.4,
                          }}
                        >
                          +
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ paddingTop: 6 }}>
            <div style={label}>{lot.brand}</div>
            <h1
              style={{
                fontFamily: head,
                fontWeight: 500,
                fontSize: "clamp(32px,4.4vw,52px)",
                lineHeight: 1.05,
                margin: "10px 0 0",
                color: C.ink,
              }}
            >
              {lot.model}
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 20 }}>
              <div style={{ fontFamily: body, fontWeight: 600, fontSize: 24, color: C.ink }}>
                {fmt(lot.price)}
              </div>
              <span style={{ ...label, display: "inline-flex", alignItems: "center", gap: 7 }}>
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: 8,
                    background:
                      lot.status === "available"
                        ? "#6E9B6A"
                        : lot.status === "reserved"
                          ? "#B4503C"
                          : C.gold,
                  }}
                />
                {STATUS[lot.status]}
              </span>
            </div>
            {showRetail && (
              <div style={{ fontFamily: body, fontSize: 13, color: C.ink2, marginTop: 8 }}>
                Ретейл в бутике – около {fmt(lot.retail)}
              </div>
            )}
            <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
              <a href={tg} target="_blank" rel="noreferrer" style={btnInk} className="btn-primary">
                Забронировать у Ирины <ArrowRight size={15} />
              </a>
              <button
                onClick={() => onFav(lot.id)}
                style={{ ...btnGhost, padding: "14px 22px" }}
                className="btn-secondary"
              >
                <HeartIcon size={15} filled={fav} /> {fav ? "В избранном" : "Сохранить"}
              </button>
              <button
                onClick={share}
                aria-label="Поделиться"
                className="btn-secondary"
                style={{ ...btnGhost, padding: "14px 18px" }}
              >
                <Share2 size={15} strokeWidth={1.5} /> {copied ? "Скопировано" : "Поделиться"}
              </button>
            </div>
            <div
              style={{
                fontFamily: body,
                fontWeight: 300,
                fontSize: 12.5,
                lineHeight: 1.65,
                color: C.ink2,
                marginTop: 14,
                maxWidth: 460,
              }}
            >
              Пошлины и доставка включены в цену. Бронь ни к чему не обязывает – Ирина подтвердит
              наличие и ответит лично.{" "}
              <span
                onClick={() => {
                  onClose();
                  go("home");
                  setTimeout(() => window.__scrollToId && window.__scrollToId("how"), 180);
                }}
                style={{ color: C.accent, cursor: "pointer", whiteSpace: "nowrap" }}
                className="hov"
              >
                Как это устроено →
              </span>
            </div>
            <div style={{ marginTop: 36 }}>
              <div
                className="pv-tabs"
                style={{ display: "flex", gap: 26, borderBottom: "1px solid " + C.line }}
              >
                {[
                  ["desc", "Описание"],
                  ["specs", "Характеристики"],
                  ["auth", "Проверка"],
                ].map(([k, t]) => (
                  <button
                    key={k}
                    onClick={() => setTab(k)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "0 0 12px",
                      fontFamily: head,
                      fontWeight: 400,
                      fontSize: 16,
                      color: tab === k ? C.ink : C.ink2,
                      borderBottom: tab === k ? "2px solid " + C.accent : "2px solid transparent",
                      marginBottom: -1,
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {tab === "desc" && (
                <div style={{ marginTop: 22 }}>
                  {String(lot.desc)
                    .split("\n\n")
                    .map((para, pi) => (
                      <p
                        key={pi}
                        style={{
                          fontFamily: mont,
                          fontWeight: 300,
                          fontSize: 16,
                          lineHeight: 1.7,
                          color: C.ink,
                          marginTop: pi ? 16 : 0,
                        }}
                      >
                        {para}
                      </p>
                    ))}
                </div>
              )}
              {tab === "specs" && (
                <div style={{ marginTop: 8 }}>
                  {Object.entries(lot.specs || {})
                    .filter(([, v]) => v)
                    .map(([k, v]) => (
                      <div
                        key={k}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: 20,
                          padding: "13px 0",
                          borderBottom: "1px solid " + C.line,
                          fontFamily: mont,
                          fontSize: 14,
                        }}
                      >
                        <span style={{ color: C.ink2 }}>{SPEC_LABELS[k] || k}</span>
                        <span style={{ color: C.ink, textAlign: "right" }}>{v}</span>
                      </div>
                    ))}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "13px 0",
                      fontFamily: mont,
                      fontSize: 14,
                    }}
                  >
                    <span style={{ color: C.ink2 }}>Состояние</span>
                    <span style={{ textAlign: "right" }}>
                      {lot.conditionNote || lot.condition || "уточняется"}
                    </span>
                  </div>
                </div>
              )}
              {tab === "auth" && (
                <div style={{ marginTop: 22 }}>
                  <p
                    style={{
                      fontFamily: mont,
                      fontWeight: 300,
                      fontSize: 15,
                      lineHeight: 1.7,
                      color: C.ink2,
                      margin: "0 0 18px",
                      maxWidth: 460,
                    }}
                  >
                    {lot.auth === "entrupy"
                      ? "Перед передачей сумка проходит аппаратную проверку Entrupy – с цифровым сертификатом, который можно проверить самостоятельно."
                      : lot.auth === "expert"
                        ? "Hermès проверяет профильный специалист вручную: кожа, строчка, клейма, фурнитура. Entrupy для Hermès не применяется – только живая экспертиза."
                        : "Перед передачей украшение проверяет доверенный ювелир в Москве: металл, пробы, камни и клейма."}{" "}
                    Гарантия подлинности действует всегда.
                  </p>
                  <button
                    onClick={onAuth}
                    style={{
                      width: "100%",
                      display: "flex",
                      gap: 16,
                      alignItems: "center",
                      textAlign: "left",
                      background: C.card,
                      border: "none",
                      cursor: "pointer",
                      padding: 14,
                    }}
                  >
                    <div style={{ width: 80, flexShrink: 0 }}>
                      <Photo
                        src={lot.auth === "entrupy" ? IMG.device : IMG.inspector}
                        ratio="1/1"
                      />
                    </div>
                    <div>
                      <div style={label}>Подлинность</div>
                      <div
                        style={{
                          fontFamily: head,
                          fontWeight: 500,
                          fontSize: 17,
                          color: C.ink,
                          marginTop: 4,
                          lineHeight: 1.15,
                        }}
                      >
                        {lot.auth === "entrupy"
                          ? "Проверка Entrupy"
                          : lot.auth === "expert"
                            ? "Экспертиза специалиста"
                            : "Экспертиза ювелира"}
                      </div>
                      <div style={{ ...label, marginTop: 8, color: C.accent }}>
                        Как мы проверяем →
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <section style={{ marginTop: "clamp(72px,9vw,120px)" }}>
          <h2
            style={{
              fontFamily: head,
              fontWeight: 400,
              fontSize: "clamp(26px,3.4vw,42px)",
              textAlign: "center",
              color: C.ink,
              margin: "0 0 clamp(30px,4vw,52px)",
            }}
          >
            Вам может понравиться
          </h2>
          <div
            className="newin-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 60 }}
          >
            {related.map((rl, i) => (
              <Card
                key={rl.id}
                lot={rl}
                i={i}
                fav={favs.has(rl.id)}
                onFav={onFav}
                onOpen={onOpen}
              />
            ))}
          </div>
        </section>
      </div>
      <Footer
        go={(v, c) => {
          onClose();
          go(v, c);
        }}
      />
    </div>
  );
}

/* ---------- search request ---------- */
