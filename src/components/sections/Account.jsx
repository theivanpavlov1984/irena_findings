"use client";
import { useEffect, useState } from "react";
import { Card } from "../catalog/Card";
import { C, body, btnGhost, btnInk, head, label, mont } from "../../constants/theme";
import { useLots } from "../../context/LotsContext";

/** Этапы работы над заявкой — совпадают с enum order_status в базе. */
const STATUS_FLOW = [
  ["new", "Заявка принята", "Получили запрос – Ирина напишет вам лично."],
  ["searching", "Ищем", "Подбираем вещь в нужном состоянии и комплекте."],
  ["found", "Нашли", "Согласуем вещь, комплект и стоимость."],
  ["checking", "Проверка подлинности", "Entrupy для сумок, ювелир – для украшений."],
  ["in_transit", "В пути", "Вещь едет в Москву."],
  ["ready", "Готова к передаче", "Договариваемся о встрече."],
  ["done", "Передана", "Заявка завершена."],
];

function fmtPrice(p) {
  return p == null ? "Цена по запросу" : new Intl.NumberFormat("ru-RU").format(p) + " \u20bd";
}

function fmtDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const inputStyle = {
  width: "100%",
  padding: "13px 16px",
  border: "1px solid " + C.line,
  background: C.card,
  fontFamily: mont,
  fontSize: 15,
  color: C.ink,
  outline: "none",
  borderRadius: 0,
  boxSizing: "border-box",
};

/** Форма входа: сначала почта, потом код из письма. */
function LoginForm({ onSuccess }) {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const sendCode = async () => {
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Не удалось отправить письмо");
      setStep("code");
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  const verify = async () => {
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Не удалось войти");
      onSuccess();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ maxWidth: 380, margin: "0 auto" }}>
      {step === "email" ? (
        <>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Ваша почта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && email && !busy && sendCode()}
            style={inputStyle}
          />
          <button
            onClick={sendCode}
            disabled={busy || !email}
            className="btn-primary"
            style={{ ...btnInk, width: "100%", marginTop: 12, opacity: busy || !email ? 0.5 : 1 }}
          >
            {busy ? "Отправляем…" : "Получить код"}
          </button>
        </>
      ) : (
        <>
          <div
            style={{
              fontFamily: mont,
              fontSize: 13,
              color: C.ink2,
              marginBottom: 14,
              lineHeight: 1.6,
            }}
          >
            Отправили код на {email}. Письмо приходит в течение минуты – проверьте и папку
            «Спам».
          </div>
          <input
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            placeholder="Код из письма"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            onKeyDown={(e) => e.key === "Enter" && code.length === 6 && !busy && verify()}
            style={{ ...inputStyle, letterSpacing: 6, textAlign: "center", fontSize: 20 }}
          />
          <button
            onClick={verify}
            disabled={busy || code.length !== 6}
            className="btn-primary"
            style={{
              ...btnInk,
              width: "100%",
              marginTop: 12,
              opacity: busy || code.length !== 6 ? 0.5 : 1,
            }}
          >
            {busy ? "Проверяем…" : "Войти"}
          </button>
          <button
            onClick={() => {
              setStep("email");
              setCode("");
              setError("");
            }}
            style={{
              background: "none",
              border: "none",
              fontFamily: mont,
              fontSize: 13,
              color: C.ink2,
              cursor: "pointer",
              marginTop: 14,
              padding: 0,
            }}
          >
            Изменить почту
          </button>
        </>
      )}

      {error && (
        <div style={{ fontFamily: mont, fontSize: 13, color: C.hot, marginTop: 14 }}>{error}</div>
      )}
    </div>
  );
}

function OrderCard({ order }) {
  const idx = STATUS_FLOW.findIndex(([k]) => k === order.status);
  const cancelled = order.status === "cancelled";

  return (
    <div
      style={{ border: "1px solid " + C.line, background: C.card, padding: "clamp(20px,3vw,32px)" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontFamily: head, fontWeight: 400, fontSize: 22, color: C.ink }}>
            {order.title}
          </div>
          <div style={{ fontFamily: mont, fontSize: 13, color: C.ink2, marginTop: 6 }}>
            Заявка от {fmtDate(order.created_at)}
          </div>
        </div>
        <div style={{ fontFamily: mont, fontSize: 18, color: C.ink, whiteSpace: "nowrap" }}>
          {fmtPrice(order.price)}
        </div>
      </div>

      {cancelled ? (
        <div style={{ fontFamily: mont, fontSize: 14, color: C.ink2, marginTop: 22 }}>
          Заявка отменена
        </div>
      ) : (
        <div style={{ marginTop: 26 }}>
          {STATUS_FLOW.map(([key, title, hint], i) => {
            const passed = i < idx;
            const current = i === idx;
            const last = i === STATUS_FLOW.length - 1;
            return (
              <div key={key} style={{ display: "flex", gap: 14, alignItems: "stretch" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div
                    style={{
                      width: current ? 12 : 8,
                      height: current ? 12 : 8,
                      borderRadius: 20,
                      background: passed || current ? C.accent : C.line,
                      marginTop: current ? 4 : 6,
                      flexShrink: 0,
                    }}
                  />
                  {!last && (
                    <div style={{ width: 1, flex: 1, background: passed ? C.accent : C.line }} />
                  )}
                </div>
                <div style={{ paddingBottom: last ? 0 : 16 }}>
                  <div
                    style={{
                      fontFamily: mont,
                      fontSize: 14,
                      fontWeight: current ? 500 : 400,
                      color: passed || current ? C.ink : C.ink2,
                    }}
                  >
                    {title}
                  </div>
                  {current && (
                    <div
                      style={{
                        fontFamily: mont,
                        fontSize: 13,
                        color: C.ink2,
                        marginTop: 4,
                        maxWidth: 460,
                        lineHeight: 1.6,
                      }}
                    >
                      {order.note || hint}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function Account({ favs, onFav, onOpen, go }) {
  const LOTS = useLots();
  const items = LOTS.filter((l) => favs.has(l.id));

  const [state, setState] = useState({ loading: true, user: null, orders: [] });

  const load = () => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then((d) => setState({ loading: false, user: d.user, orders: d.orders || [] }))
      .catch(() => setState({ loading: false, user: null, orders: [] }));
  };

  useEffect(load, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setState({ loading: false, user: null, orders: [] });
  };

  const favBlock = (
    <div style={{ marginTop: "clamp(48px,6vw,80px)" }}>
      <div style={{ ...label, marginBottom: 22 }}>Избранное</div>
      {items.length ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
            gap: "clamp(16px,2vw,28px)",
          }}
        >
          {items.map((l) => (
            <Card key={l.id} lot={l} fav onFav={onFav} onOpen={onOpen} />
          ))}
        </div>
      ) : (
        <div style={{ fontFamily: mont, fontSize: 14, color: C.ink2 }}>
          Пока пусто. Отмечайте вещи сердечком в каталоге – они появятся здесь.
        </div>
      )}
    </div>
  );

  return (
    <div
      className="wrap"
      style={{
        maxWidth: 1340,
        margin: "0 auto",
        padding: "clamp(160px,19vw,215px) 0 clamp(60px,9vw,120px)",
        animation: "fadeIn .4s ease",
      }}
    >
      <h1
        style={{
          fontFamily: head,
          fontWeight: 400,
          fontSize: "clamp(34px,5vw,64px)",
          textAlign: "center",
          margin: "0 0 clamp(36px,5vw,56px)",
          color: C.ink,
        }}
      >
        Кабинет
      </h1>

      {state.loading ? (
        <div style={{ fontFamily: mont, fontSize: 14, color: C.ink2, textAlign: "center" }}>
          Загружаем…
        </div>
      ) : !state.user ? (
        <>
          <p
            style={{
              fontFamily: body,
              fontWeight: 300,
              fontSize: 16,
              lineHeight: 1.7,
              color: C.ink2,
              margin: "0 auto 32px",
              maxWidth: 440,
              textAlign: "center",
            }}
          >
            Здесь видно, на каком этапе ваша заявка: ищем, проверяем подлинность, везём. Введите
            почту – пришлём код для входа.
          </p>

          <LoginForm onSuccess={load} />

          <p
            style={{
              fontFamily: body,
              fontWeight: 300,
              fontSize: 13,
              lineHeight: 1.7,
              color: C.ink2,
              marginTop: 28,
              textAlign: "center",
              maxWidth: 440,
              marginInline: "auto",
            }}
          >
            Заявку создаёт Ирина после разговора с вами – для заказа регистрация не нужна.
          </p>
          {favBlock}
        </>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              paddingBottom: 26,
              borderBottom: "1px solid " + C.line,
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 60,
                background: C.accent,
                color: "#fff",
                display: "grid",
                placeItems: "center",
                fontFamily: head,
                fontSize: 22,
                flexShrink: 0,
              }}
            >
              {String(state.user.name).slice(0, 1).toUpperCase()}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: head,
                  fontWeight: 400,
                  fontSize: 20,
                  color: C.ink,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {state.user.name}
              </div>
            </div>
            <button onClick={logout} style={{ ...btnGhost }} className="btn-secondary">
              Выйти
            </button>
          </div>

          <div style={{ marginTop: "clamp(32px,4vw,48px)" }}>
            <div style={{ ...label, marginBottom: 22 }}>Мои заявки</div>
            {state.orders.length ? (
              <div style={{ display: "grid", gap: "clamp(16px,2vw,24px)" }}>
                {state.orders.map((o) => (
                  <OrderCard key={o.id} order={o} />
                ))}
              </div>
            ) : (
              <div
                style={{
                  border: "1px solid " + C.line,
                  padding: "clamp(24px,4vw,40px)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontFamily: mont, fontSize: 14, color: C.ink2, lineHeight: 1.7 }}>
                  Активных заявок нет. Напишите Ирине, что ищете – она заведёт заявку, и здесь
                  появится статус.
                </div>
                <button
                  onClick={() => go("catalog", "bags")}
                  style={{ ...btnInk, marginTop: 24 }}
                  className="btn-primary"
                >
                  Смотреть каталог
                </button>
              </div>
            )}
          </div>

          {favBlock}
        </div>
      )}
    </div>
  );
}
