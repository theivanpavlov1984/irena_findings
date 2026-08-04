"use client";
import { useState } from "react";
import { Card } from "../catalog/Card";
import { C, body, btnGhost, head, mont } from "../../constants/theme";
import { useLots } from "../../context/LotsContext";
import { btnInk, label } from "../../constants/theme";
export function Account({ favs, onFav, onOpen, go }) {
  const LOTS = useLots();
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

      {!signedIn ? (
        <div style={{ maxWidth: 460, margin: "0 auto", textAlign: "center" }}>
          <p
            style={{
              fontFamily: body,
              fontWeight: 300,
              fontSize: 16,
              lineHeight: 1.7,
              color: C.ink2,
              margin: "0 0 32px",
            }}
          >
            Ваше личное пространство: заявки, что сейчас в работе, и лист ожидания вещей, которые
            ищем под вас. Вход через <span style={{ fontFamily: mont }}>Telegram</span> – без
            логинов и паролей.
          </p>
          <button
            onClick={() => setSignedIn(true)}
            style={{ ...btnInk, width: "100%", justifyContent: "center", gap: 10 }}
            className="btn-primary"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill={C.bg}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
            </svg>{" "}
            Войти через Telegram
          </button>
          <p
            style={{
              fontFamily: body,
              fontWeight: 300,
              fontSize: 13,
              lineHeight: 1.7,
              color: C.ink2,
              marginTop: 28,
            }}
          >
            Чтобы написать Ирине, регистрация не нужна – кабинет можно завести после первого
            обращения.
          </p>
        </div>
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
              }}
            >
              А
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: head, fontWeight: 400, fontSize: 20, color: C.ink }}>
                Анна
              </div>
              <div style={{ fontFamily: mont, fontSize: 13, color: C.ink2 }}>
                @anna · через Telegram
              </div>
            </div>
            <button
              onClick={() => setSignedIn(false)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: body,
                fontSize: 13,
                color: C.ink2,
              }}
              className="hov"
            >
              Выйти
            </button>
          </div>

          <section style={{ marginTop: "clamp(40px,6vw,70px)" }}>
            <h2
              style={{
                fontFamily: head,
                fontWeight: 400,
                fontSize: "clamp(24px,3vw,36px)",
                margin: "0 0 24px",
                color: C.ink,
              }}
            >
              Мои заявки
            </h2>
            <div style={{ background: C.panel, padding: "clamp(24px,4vw,44px)" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  paddingBottom: 26,
                  marginBottom: 30,
                  borderBottom: "1px solid " + C.line,
                }}
              >
                <div
                  style={{
                    width: 60,
                    height: 60,
                    background: C.bg,
                    border: "1px solid " + C.line,
                    display: "grid",
                    placeItems: "center",
                    fontFamily: head,
                    fontSize: 22,
                    color: C.ink2,
                  }}
                >
                  {demo.brand.slice(0, 1)}
                </div>
                <div>
                  <div style={{ ...label, fontSize: 10.5, color: C.ink2, marginBottom: 6 }}>
                    Заявка · 14 июня
                  </div>
                  <div style={{ fontFamily: head, fontWeight: 400, fontSize: 19, color: C.ink }}>
                    {demo.brand} {demo.model}
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
                  gap: "clamp(20px,2.4vw,34px)",
                }}
              >
                {steps.map(([t, d], i) => {
                  const active = i === activeStep;
                  return (
                    <div key={i} style={{ opacity: i > activeStep ? 0.45 : 1 }}>
                      <div
                        style={{
                          fontFamily: head,
                          fontSize: 32,
                          lineHeight: 1,
                          color: active ? C.accent : C.ink,
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div
                        style={{
                          height: 2,
                          background: i <= activeStep ? C.accent : C.line,
                          margin: "14px 0",
                        }}
                      />
                      <div
                        style={{
                          fontFamily: head,
                          fontWeight: 400,
                          fontSize: 16,
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
                          fontSize: 13,
                          lineHeight: 1.6,
                          color: C.ink2,
                        }}
                      >
                        {d}
                      </div>
                      {active && (
                        <div style={{ ...label, fontSize: 9.5, color: C.accent, marginTop: 10 }}>
                          сейчас
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section style={{ marginTop: "clamp(48px,7vw,90px)" }}>
            <h2
              style={{
                fontFamily: head,
                fontWeight: 400,
                fontSize: "clamp(24px,3vw,36px)",
                margin: "0 0 24px",
                color: C.ink,
              }}
            >
              Лист ожидания
            </h2>
            {items.length === 0 ? (
              <div
                style={{
                  borderTop: "1px solid " + C.line,
                  paddingTop: 32,
                  fontFamily: body,
                  fontWeight: 300,
                  color: C.ink2,
                  fontSize: 16,
                  lineHeight: 1.7,
                }}
              >
                Здесь будут вещи, которые вы отметили сердечком. Ирина видит ваш лист и напишет,
                когда нужное появится.
                <div style={{ marginTop: 22 }}>
                  <button
                    onClick={() => go("catalog", "bags")}
                    style={btnGhost}
                    className="btn-secondary"
                  >
                    В каталог
                  </button>
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3,1fr)",
                  gap: "clamp(18px,2.4vw,32px)",
                }}
                className="grid-c"
              >
                {items.map((lot, i) => (
                  <Card key={lot.id} lot={lot} i={i} fav={true} onFav={onFav} onOpen={onOpen} />
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

/* ============================== APP ============================== */
