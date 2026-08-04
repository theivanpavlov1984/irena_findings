"use client";
import { HeartIcon, Logo, SearchIcon, UserIcon } from "../icons/index";
import { C, body, head } from "../../constants/theme";
export function SiteHeader({
  go,
  favs,
  floating = false,
  hidden = false,
  sticky = false,
  onSearch,
}) {
  const hStyle = floating
    ? {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 90,
        background: C.bg,
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        transition: "transform .45s cubic-bezier(.16,.8,.3,1)",
      }
    : sticky
      ? { position: "sticky", top: 0, zIndex: 60, background: C.bg }
      : { position: "relative", background: C.bg };
  return (
    <header className="site-head" style={hStyle}>
      <div className="wrap" style={{ maxWidth: 1340, margin: "0 auto", padding: "16px 0 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center" }}>
          <div />
          <Logo onClick={() => go("home")} />
          <div
            style={{
              display: "flex",
              gap: 22,
              justifyContent: "flex-end",
              alignItems: "center",
              color: C.ink,
            }}
          >
            <span
              onClick={onSearch}
              className="ico"
              style={{ cursor: "pointer", display: "inline-flex" }}
              aria-label="Поиск"
            >
              <SearchIcon size={19} />
            </span>
            <span
              onClick={() => go("account")}
              style={{ cursor: "pointer", position: "relative", display: "inline-flex" }}
              className="ico"
            >
              <HeartIcon size={19} filled={favs.size > 0} />
              {favs.size > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -8,
                    right: -10,
                    background: C.accent,
                    color: "#fff",
                    fontSize: 9,
                    fontFamily: body,
                    width: 16,
                    height: 16,
                    borderRadius: 10,
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  {favs.size}
                </span>
              )}
            </span>
            <UserIcon
              size={19}
              className="ico"
              style={{ cursor: "pointer" }}
              onClick={() => go("account")}
            />
          </div>
        </div>
        <nav
          className="nav-row"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "clamp(20px,3vw,46px)",
            padding: "14px 0",
            marginTop: 12,
            borderTop: "1px solid " + C.line,
          }}
        >
          {[
            ["Сумки", () => go("catalog", "bags")],
            ["Украшения", () => go("catalog", "jewelry")],
            ["Подлинность", () => go("authenticity")],
            [
              "Под заказ",
              () => {
                go("home");
                setTimeout(() => window.__scrollToId && window.__scrollToId("sr"), 120);
              },
            ],
          ].map(([t, fn]) => (
            <span
              key={t}
              className="navlink"
              onClick={fn}
              style={{ fontFamily: head, fontSize: 15, color: C.ink, cursor: "pointer" }}
            >
              {t}
            </span>
          ))}
        </nav>
      </div>
    </header>
  );
}
