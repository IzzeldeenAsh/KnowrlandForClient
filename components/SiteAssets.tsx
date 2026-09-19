import Script from 'next/script';
export default function SiteAssets({locale}: {locale: string}) { return <>
        {/* Open Sans */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet"/>

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

</>; }
