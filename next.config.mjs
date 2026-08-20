/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Только https, в том числе для поддоменов
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Запрет встраивания сайта в чужие фреймы (кликджекинг)
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Браузер не должен угадывать тип файла
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Не передавать полный адрес страницы на сторонние сайты
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Отключаем ненужные возможности устройства
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          // Что и откуда разрешено грузить.
          // unsafe-inline нужен: стили заданы прямо в разметке.
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob:",
              "font-src 'self'",
              "connect-src 'self' https://*.supabase.co",
              "form-action 'self'",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "object-src 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
