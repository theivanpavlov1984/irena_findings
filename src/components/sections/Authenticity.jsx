"use client";
import NextImage from "next/image";
import { Photo } from "../ui/Photo";
import { ENTRUPY_BOX, ENTRUPY_LV, IMG } from "../../constants/media";
import { TELEGRAM } from "../../constants/site";
import { C, body, head } from "../../constants/theme";
import { useReveal } from "../../hooks/useReveal";
import { btnGhost, btnInk, label } from "../../constants/theme";
export function FactItem({ n, d, i }) {
  const [r, shown] = useReveal();
  return (
    <div
      key={n}
      ref={r}
      style={{
        textAlign: "center",
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(18px)",
        transition: "all .7s ease " + i * 0.1 + "s",
      }}
    >
      <div
        style={{
          fontFamily: head,
          fontWeight: 400,
          fontSize: "clamp(36px,4.6vw,64px)",
          color: C.accent,
        }}
      >
        {n}
      </div>
      <div
        style={{
          fontFamily: body,
          fontWeight: 300,
          fontSize: 14.5,
          lineHeight: 1.55,
          color: C.ink2,
          marginTop: 12,
          maxWidth: 240,
          marginInline: "auto",
        }}
      >
        {d}
      </div>
    </div>
  );
}

export function Authenticity({ go }) {
  const facts = [
    ["\u2248 99%", "точность аппаратной аутентификации Entrupy"],
    ["Сертификат", "цифровой паспорт подлинности к каждой сумке"],
    ["Гарантия", "вернём, если подлинность под вопросом"],
  ];
  const Chapter = ({ num, img, alt, tag, title, text, text2, reverse }) => {
    const [r, s] = useReveal();
    return (
      <div
        ref={r}
        className="two"
        style={{
          display: "grid",
          gridTemplateColumns: reverse ? "1fr 1.15fr" : "1.15fr 1fr",
          gap: "clamp(30px,5.5vw,84px)",
          alignItems: "start",
          opacity: s ? 1 : 0,
          transform: s ? "none" : "translateY(30px)",
          transition: "all .9s cubic-bezier(.16,.8,.3,1)",
        }}
      >
        <div style={{ order: reverse ? 2 : 1, marginTop: reverse ? "clamp(26px,5vw,84px)" : 0 }}>
          <div
            style={{ position: "relative", maxWidth: "clamp(320px,34vw,470px)", margin: "0 auto" }}
          >
            <div style={{ overflow: "hidden", borderRadius: "999px 999px 0 0" }}>
              <Photo src={img} alt={alt} ratio="3/4" />
            </div>
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: "clamp(12px,1.8vw,20px)",
                border: "1px solid rgba(245,244,242,.75)",
                borderRadius: "999px 999px 0 0",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
        <div style={{ order: reverse ? 1 : 2, paddingTop: reverse ? 0 : "clamp(18px,3.6vw,52px)" }}>
          <div
            aria-hidden="true"
            style={{
              fontFamily: head,
              fontWeight: 400,
              fontSize: "clamp(96px,14vw,190px)",
              lineHeight: 0.8,
              color: "transparent",
              WebkitTextStroke: "1.5px " + C.ink2,
              userSelect: "none",
            }}
          >
            {num}
          </div>
          <div style={{ ...label, color: C.accent, marginTop: 20 }}>{tag}</div>
          <h3
            style={{
              fontFamily: head,
              fontWeight: 400,
              fontSize: "clamp(26px,3.4vw,46px)",
              lineHeight: 1.06,
              margin: "14px 0 0",
              color: C.ink,
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontFamily: body,
              fontWeight: 300,
              fontSize: 16,
              lineHeight: 1.7,
              color: C.ink2,
              marginTop: 16,
              maxWidth: 460,
            }}
          >
            {text}
          </p>
          {text2 ? (
            <p
              style={{
                fontFamily: body,
                fontWeight: 300,
                fontSize: 16,
                lineHeight: 1.7,
                color: C.ink2,
                marginTop: 14,
                maxWidth: 460,
              }}
            >
              {text2}
            </p>
          ) : null}
        </div>
      </div>
    );
  };
  return (
    <div style={{ animation: "fadeIn .4s ease" }}>
      <section
        className="wrap"
        style={{
          maxWidth: 1340,
          margin: "0 auto",
          padding: "clamp(160px,19vw,215px) 0 clamp(44px,7vw,84px)",
        }}
      >
        <div
          className="two"
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr",
            gap: "clamp(24px,4vw,60px)",
            alignItems: "end",
          }}
        >
          <div>
            <div style={{ ...label, color: C.accent }}>Подлинность</div>
            <h1
              style={{
                fontFamily: head,
                fontWeight: 400,
                fontSize: "clamp(44px,8vw,116px)",
                lineHeight: 0.98,
                margin: "18px 0 0",
                color: C.ink,
              }}
            >
              Двойная
              <br />
              проверка,
              <br />
              <span style={{ color: C.accent }}>а не обещание</span>
            </h1>
          </div>
          <p
            style={{
              fontFamily: body,
              fontWeight: 300,
              fontSize: "clamp(16px,1.7vw,19px)",
              lineHeight: 1.75,
              color: C.ink2,
              margin: 0,
              paddingBottom: 10,
              maxWidth: 440,
            }}
          >
            Подделка – главный страх при покупке люкса с рук. Мы закрываем его на двух уровнях:
            аппарат Entrupy для сумок и экспертиза доверенного ювелира – для украшений.
          </p>
        </div>
      </section>

      <section
        style={{
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100vw",
          maxWidth: "100vw",
        }}
      >
        <div
          style={{ position: "relative", height: "clamp(380px,48vw,660px)", overflow: "hidden" }}
        >
          <NextImage
            fill
            sizes="(max-width: 768px) 100vw, 640px"
            src={ENTRUPY_LV}
            alt="Проверка сумки Louis Vuitton аппаратом Entrupy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            left: "clamp(16px,4vw,64px)",
            bottom: "clamp(16px,3.4vw,48px)",
            background: C.bg,
            padding: "14px 22px",
            boxShadow: "0 24px 48px -24px rgba(42,36,34,.4)",
          }}
        >
          <div style={{ ...label, fontSize: 10, color: C.ink2 }}>Кадр проверки</div>
          <div
            style={{ fontFamily: head, fontWeight: 400, fontSize: 17, color: C.ink, marginTop: 5 }}
          >
            Louis Vuitton · сканирование Entrupy
          </div>
        </div>
      </section>

      <section style={{ borderBottom: "1px solid " + C.line, marginTop: "clamp(56px,8vw,110px)" }}>
        <div
          style={{
            maxWidth: 1340,
            margin: "0 auto",
            padding: "0 0 clamp(40px,6vw,72px)",
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "clamp(28px,5vw,72px)",
          }}
          className="wrap g3"
        >
          {facts.map(([n, d], i) => (
            <FactItem key={n} n={n} d={d} i={i} />
          ))}
        </div>
      </section>

      <section
        className="wrap"
        style={{
          maxWidth: 1340,
          margin: "0 auto",
          padding: "clamp(60px,9vw,130px) 0",
          display: "grid",
          gap: "clamp(70px,11vw,150px)",
        }}
      >
        <Chapter
          num="01"
          img={ENTRUPY_BOX}
          alt="Аппарат Entrupy"
          tag="Сумки"
          title="Аппарат Entrupy"
          text="Entrupy – система аутентификации, которой пользуются ресейл-площадки и бутики по всему миру. Микроскопическая камера снимает структуру кожи, строчку, фурнитуру и логотипы с увеличением, недоступным глазу."
          text2="Снимки сравниваются с базой из миллионов подлинных образцов, и алгоритм выносит вердикт с точностью около 99%. Итог – цифровой сертификат с QR-кодом."
        />
        <Chapter
          num="02"
          img={IMG.inspector}
          alt="Экспертиза ювелира"
          tag="Украшения"
          title="Экспертиза ювелира"
          reverse
          text="Украшения проверяет доверенный ювелир в Москве: металл, пробы, камни и клейма – в том числе на приборе Diamond Inspector. Перед отправкой каждое изделие полируется."
        />
      </section>

      <section
        style={{
          background: C.panel,
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100vw",
          maxWidth: "100vw",
          overflow: "hidden",
        }}
      >
        <div
          className="wrap two"
          style={{
            maxWidth: 1340,
            margin: "0 auto",
            padding: "clamp(56px,9vw,120px) 24px",
            display: "grid",
            gridTemplateColumns: "1fr 1.1fr",
            gap: "clamp(32px,6vw,90px)",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ ...label, color: C.accent }}>Сертификат</div>
            <h3
              style={{
                fontFamily: head,
                fontWeight: 400,
                fontSize: "clamp(26px,3.4vw,46px)",
                lineHeight: 1.06,
                margin: "14px 0 0",
                color: C.ink,
              }}
            >
              Паспорт подлинности к каждой сумке
            </h3>
            <p
              style={{
                fontFamily: body,
                fontWeight: 300,
                fontSize: 16,
                lineHeight: 1.7,
                color: C.ink2,
                marginTop: 16,
                maxWidth: 420,
              }}
            >
              После проверки Entrupy выдаёт цифровой сертификат с фото, брендом, материалом и QR.
              Подлинность можно подтвердить самостоятельно на entrupy.com – ещё до получения сумки.
            </p>
          </div>
          <div
            style={{
              transform: "rotate(-2.5deg)",
              boxShadow: "0 44px 80px -36px rgba(42,36,34,.45)",
              background: C.card,
              padding: "clamp(10px,1.6vw,20px)",
            }}
          >
            <Photo src={IMG.cert} alt="Сертификат Entrupy" ratio="3/2" fit="contain" />
          </div>
        </div>
      </section>

      <section
        className="wrap"
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "clamp(70px,11vw,150px) 0",
          textAlign: "center",
        }}
      >
        <div style={{ ...label, color: C.accent }}>Возвраты</div>
        <h2
          style={{
            fontFamily: head,
            fontWeight: 400,
            fontSize: "clamp(30px,4.4vw,58px)",
            lineHeight: 1.12,
            margin: "18px 0 0",
            color: C.ink,
          }}
        >
          Возврата «передумала» нет.
          <br />
          <span style={{ color: C.accent }}>Гарантия подлинности – всегда.</span>
        </h2>
        <div
          className="two"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(20px,3.4vw,48px)",
            textAlign: "left",
            marginTop: "clamp(30px,4.6vw,54px)",
          }}
        >
          <p
            style={{
              fontFamily: body,
              fontWeight: 300,
              fontSize: 16,
              lineHeight: 1.75,
              color: C.ink2,
              margin: 0,
            }}
          >
            Каждая вещь привозится под конкретный заказ и проходит проверку подлинности, поэтому
            возврат «передумала» мы не делаем. Это честное условие премиального ресейла, и мы
            проговариваем его до покупки.
          </p>
          <p
            style={{
              fontFamily: body,
              fontWeight: 300,
              fontSize: 16,
              lineHeight: 1.75,
              color: C.ink2,
              margin: 0,
            }}
          >
            Но если подлинность когда-либо вызовет сомнение или вещь не совпадёт с тем, что мы
            показали и обсудили, – вернём деньги или заменим. Гарантия подлинности действует всегда.
          </p>
        </div>
      </section>

      <section style={{ background: C.btn, color: "#fff" }}>
        <div
          className="wrap"
          style={{
            maxWidth: 1340,
            margin: "0 auto",
            padding: "clamp(56px,9vw,110px) 0",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: head,
              fontWeight: 400,
              fontSize: "clamp(28px,4vw,50px)",
              margin: 0,
            }}
          >
            Остался вопрос о подлинности?
          </h2>
          <div
            style={{
              marginTop: 30,
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href={TELEGRAM}
              target="_blank"
              rel="noreferrer"
              style={{ ...btnInk, background: "#fff", color: C.ink }}
              className="btn-primary"
            >
              Написать Ирине
            </a>
            <button
              onClick={() => go("catalog")}
              style={{ ...btnGhost, color: "#fff", borderColor: "rgba(255,255,255,.4)" }}
              className="btn-secondary"
            >
              Смотреть каталог
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- account ---------- */
