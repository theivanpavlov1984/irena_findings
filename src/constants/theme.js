export const C = {
  bg: "#F5F4F2",
  panel: "#E5E0D8",
  card: "#FFFFFF",
  ink: "#2A2422",
  ink2: "#8A7B74",
  line: "rgba(42,36,34,0.13)",
  accent: "#652527",
  hot: "#E96442",
  gold: "#BFA055",
  btn: "#652527",
  stroke: "#D9D1C6",
};

export const head = "'Cyrene', 'Oranienbaum', serif";

export const body = "'Cyrene', 'Montserrat', sans-serif";

export const mont = "'Montserrat', sans-serif";

export const label = {
  fontFamily: body,
  fontSize: 11,
  letterSpacing: 2.4,
  textTransform: "uppercase",
  color: C.ink2,
};

export const btnInk = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  background: C.ink,
  color: C.bg,
  border: "none",
  padding: "16px 30px",
  fontFamily: "'Oranienbaum', serif",
  fontSize: 11.5,
  letterSpacing: 1.8,
  textTransform: "uppercase",
  textDecoration: "none",
  cursor: "pointer",
  transition: "background .3s, color .3s",
};

export const btnGhost = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  background: "transparent",
  color: C.ink,
  border: "1px solid " + C.ink,
  padding: "15px 28px",
  fontFamily: "'Oranienbaum', serif",
  fontSize: 11.5,
  letterSpacing: 1.8,
  textTransform: "uppercase",
  textDecoration: "none",
  cursor: "pointer",
  transition: "background .3s,color .3s",
};
