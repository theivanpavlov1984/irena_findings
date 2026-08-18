"use client";
import { ArrowRight, Instagram } from "lucide-react";
import { ADDRESS, INSTAGRAM, TELEGRAM, TELEGRAM_CHANNEL } from "../../constants/site";
import { C, body, head, label, mont } from "../../constants/theme";
import { btnInk } from "../../constants/theme";
export function Footer({ go }) {
  return (
    <footer style={{ borderTop: "1px solid " + C.line }}>
      <div
        style={{
          maxWidth: 1340,
          margin: "0 auto",
          padding: "clamp(50px,7vw,90px) 0",
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr 1.3fr",
          gap: 40,
        }}
        className="wrap foot"
      >
        <div>
          <div style={{ fontWeight: 400, fontSize: 26, letterSpacing: 0.5 }}>
            <span style={{ fontFamily: head, color: C.ink }}>Irena</span>{" "}
            <span style={{ fontFamily: mont, color: C.ink2, fontSize: 18 }}>| Находки</span>
          </div>
          <p
            style={{
              fontFamily: body,
              fontWeight: 300,
              fontSize: 14,
              lineHeight: 1.7,
              color: C.ink2,
              maxWidth: 290,
              marginTop: 16,
            }}
          >
            Персональный байер премиальных сумок и украшений. Под заказ, с проверкой подлинности.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 22 }}>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="soc"
              style={{ width: 40, height: 40, display: "grid", placeItems: "center" }}
            >
              <Instagram size={18} strokeWidth={1.4} />
            </a>
            <a
              href={TELEGRAM_CHANNEL}
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
              className="soc"
              style={{ width: 40, height: 40, display: "grid", placeItems: "center" }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: 1 }}
              >
                <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
              </svg>
            </a>
          </div>
        </div>
        <div>
          <div
            style={{
              fontFamily: head,
              fontWeight: 500,
              fontSize: 16,
              marginBottom: 16,
              color: C.ink,
            }}
          >
            Каталог
          </div>
          {[
            ["Сумки", () => go("catalog", "bags")],
            ["Украшения", () => go("catalog", "jewelry")],
            ["Часы", () => go("catalog", "watches")],
            [
              "Под заказ",
              () => {
                go("home");
                setTimeout(() => window.__scrollToId && window.__scrollToId("sr"), 200);
              },
            ],
          ].map(([t, fn]) => (
            <div
              key={t}
              onClick={fn}
              style={{
                fontFamily: body,
                fontWeight: 300,
                fontSize: 14,
                color: C.ink2,
                marginBottom: 11,
                cursor: "pointer",
              }}
            >
              {t}
            </div>
          ))}
        </div>
        <div>
          <div
            style={{
              fontFamily: head,
              fontWeight: 500,
              fontSize: 16,
              marginBottom: 16,
              color: C.ink,
            }}
          >
            Сервис
          </div>
          {[
            ["Подлинность", () => go("authenticity")],
            ["Кабинет", () => go("account")],
          ].map(([t, fn]) => (
            <div
              key={t}
              onClick={fn}
              style={{
                fontFamily: body,
                fontWeight: 300,
                fontSize: 14,
                color: C.ink2,
                marginBottom: 11,
                cursor: "pointer",
              }}
            >
              {t}
            </div>
          ))}
          <a
            href={TELEGRAM}
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily: body,
              fontWeight: 300,
              fontSize: 14,
              color: C.ink2,
              textDecoration: "none",
              display: "block",
            }}
          >
            Контакты
          </a>
        </div>
        <div>
          <div
            style={{
              fontFamily: head,
              fontWeight: 500,
              fontSize: 16,
              marginBottom: 14,
              color: C.ink,
            }}
          >
            Шоурум
          </div>
          <p
            style={{
              fontFamily: body,
              fontWeight: 300,
              fontSize: 14,
              lineHeight: 1.7,
              color: C.ink2,
              marginBottom: 18,
            }}
          >
            {ADDRESS}
            <br />
            <span style={{ fontSize: 13 }}>По предварительной записи</span>
          </p>
          <a
            href={TELEGRAM_CHANNEL}
            target="_blank"
            rel="noreferrer"
            style={{ ...btnInk, padding: "13px 22px" }}
            className="btn-primary"
          >
            Канал · Находки <ArrowRight size={15} />
          </a>
        </div>
      </div>
      <div
        className="wrap"
        style={{
          maxWidth: 1340,
          margin: "0 auto",
          padding: "20px 0",
          borderTop: "1px solid " + C.line,
          ...label,
          fontSize: 10.5,
        }}
      >
        Москва · {new Date().getFullYear()} · прототип витрины
      </div>
    </footer>
  );
}
