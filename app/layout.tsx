
import React from 'react';
import Script from 'next/script';
import { getLocale } from 'next-intl/server';
import { publicBaseUrl } from './config';

export const metadata = {
  metadataBase: new URL(publicBaseUrl),
  title: 'Insighta',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction} className="scroll-smooth">
      <head>
        {/* Favicon and Icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icons-512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Web App Manifest */}
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#6366f1" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Insighta" />

        {/* Keenicons CSS */}
        <link rel="stylesheet" href="/keenicons.css" />
        <link rel="stylesheet" href="/assets/plugins/keenicons/duotone/style.css" />
        <link rel="stylesheet" href="/assets/plugins/keenicons/outline/style.css" />
        <link rel="stylesheet" href="/assets/plugins/keenicons/solid/style.css" />

        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-R1XT5PMHG0"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-R1XT5PMHG0', {
              page_path: window.location.pathname,
              page_location: window.location.href,
              send_page_view: false
            });
          `}
        </Script>

        {/* Client-side helper for problematic routes */}
        <Script id="route-fixups" strategy="afterInteractive">
          {`
            (function() {
              var currentLocale = '${locale}';
              var path = window.location.pathname;

              if (path === '/' + currentLocale + '/filter-knowledges/topic/139/insight') {
                if (window.history && window.history.replaceState) {
                  window.history.replaceState({}, '', '/' + currentLocale + '/filter-knowledges/topic/139/insight');
                }
              }

              if (path.includes('/filter-knowledges/')) {
                var pathParts = path.split('/');
                if (pathParts.length === 6) {
                  var locale = pathParts[1];
                  var taxonomy = pathParts[3];
                  var id = pathParts[4];
                  var type = pathParts[5];
                  console.log('Detected filter-knowledges route:', { locale: locale, taxonomy: taxonomy, id: id, type: type });
                }
              }
            })();
          `}
        </Script>
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
