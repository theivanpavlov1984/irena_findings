import { SITE } from "../lib/site.js";

export const metadata = {
  metadataBase: new URL(SITE),
  title: "Irena | Находки — премиальные сумки и украшения под заказ",
  description: "Проверенные премиальные сумки и украшения. Подлинность подтверждена Entrupy и ювелиром. Доставка и передача в Москве.",
  openGraph: { type: "website", locale: "ru_RU", siteName: "Irena | Находки" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <link rel="preload" href="/fonts/montserrat-400-cyr.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/oranienbaum-400-cyr.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
