"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { TELEGRAM } from "../../constants/site";
import { C, body, head } from "../../constants/theme";
import { useReveal } from "../../hooks/useReveal";
import { btnInk, label } from "../../constants/theme";
export function SearchRequest() {
  const [ref, s] = useReveal();
  const [f, setF] = useState({ brand: "", model: "", color: "", budget: "", link: "" });
  const text = encodeURIComponent(
    "Здравствуйте, Ирина! Ищу под заказ:\nБренд: " +
      f.brand +
      "\nМодель: " +
      f.model +
      "\nЦвет: " +
      f.color +
      "\nБюджет: " +
      f.budget +
      (f.link ? "\nСсылка/комментарий: " + f.link : "")
  );
  const blank = (k, ph) => (
    <input
      value={f[k]}
      onChange={(e) => setF({ ...f, [k]: e.target.value })}
      placeholder={ph}
      className="field"
      size={Math.max((f[k] || ph).length + 1, 5)}
      style={{
        background: "none",
        border: "none",
        borderBottom: "2px solid " + C.accent,
        padding: "0 4px 3px",
        margin: "0 2px",
        fontSize: "inherit",
        lineHeight: 1.2,
        color: C.accent,
        fontFamily: "inherit",
        outline: "none",
        textAlign: "center",
        maxWidth: "92vw",
        verticalAlign: "baseline",
      }}
    />
  );
  return (
    <section
      ref={ref}
      id="sr"
      style={{
        background: C.panel,
        position: "relative",
        left: "50%",
        transform: "translateX(-50%)",
        width: "100vw",
        maxWidth: "100vw",
        margin: "clamp(48px,6vw,90px) 0 0",
        opacity: s ? 1 : 0,
        transition: "opacity .9s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "clamp(70px,9vw,130px) 24px",
          textAlign: "center",
        }}
      >
        <div style={{ ...label, color: C.accent }}>Под заказ</div>
        <h2
          style={{
            fontFamily: head,
            fontWeight: 400,
            fontSize: "clamp(32px,4.6vw,58px)",
            lineHeight: 1.05,
            margin: "16px 0 0",
            color: C.ink,
          }}
        >
          Нет в подборке?
          <br />
          Найдём и привезём.
        </h2>
        <p
          style={{
            fontFamily: head,
            fontWeight: 400,
            fontSize: "clamp(22px,3.2vw,40px)",
            lineHeight: 1.75,
            color: C.ink,
            margin: "clamp(40px,5vw,64px) auto 0",
            maxWidth: 980,
          }}
        >
          Ищу {blank("brand", "бренд")} , модель {blank("model", "какую")} ,
          <br className="mad-br" />в цвете {blank("color", "каком")} , с бюджетом до{" "}
          {blank("budget", "суммы")} ₽.
        </p>
        <div style={{ margin: "clamp(26px,3.6vw,40px) auto 0", maxWidth: 560 }}>
          <input
            value={f.link}
            onChange={(e) => setF({ ...f, link: e.target.value })}
            placeholder="Видели её где-то? Оставьте ссылку или пару слов – не обязательно"
            className="field"
            style={{
              width: "100%",
              background: "none",
              border: "none",
              borderBottom: "1px solid " + C.line,
              padding: "12px 2px",
              fontSize: 14.5,
              color: C.ink,
              fontFamily: body,
              fontWeight: 300,
              outline: "none",
              textAlign: "center",
            }}
          />
        </div>
        <p
          style={{
            fontFamily: body,
            fontWeight: 300,
            fontSize: 15,
            lineHeight: 1.7,
            color: C.ink2,
            margin: "clamp(24px,3.4vw,36px) auto 0",
            maxWidth: 460,
          }}
        >
          Ирина подберёт варианты под запрос, проверит подлинность и пришлёт фото до покупки.
        </p>
        <a
          href={TELEGRAM + "?text=" + text}
          target="_blank"
          rel="noreferrer"
          style={{ ...btnInk, marginTop: "clamp(26px,3.6vw,40px)" }}
          className="btn-primary"
        >
          Отправить запрос Ирине <ArrowRight size={15} />
        </a>
      </div>
    </section>
  );
}

/* ---------- authenticity ---------- */
