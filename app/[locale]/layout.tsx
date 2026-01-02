// app/[locale]/layout.tsx
import './css/style.css';
import AOSProvider from "@/components/aos-provider";
import { Almarai } from 'next/font/google';
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {Locale, routing} from '@/i18n/routing';
import Header from '@/components/ui/header';
import { LoadingProvider } from '@/components/context/LoadingContext';
import { ToastProvider } from '@/components/toast/ToastContext';
import '@/components/toast/toast.css';
import '@/components/toast/keenicons.css';
import ClientLogoutHandler from './ClientLogoutHandler';
import ConditionalAuthBanner from '@/components/ui/conditional-auth-banner';
import { GlobalProfileProvider } from '@/components/auth/GlobalProfileProvider';
import GlobalAuthHandler from '@/components/auth/GlobalAuthHandler';
import RoleGuard from '@/components/auth/RoleGuard';
import AnalyticsProvider from '@/app/analytics-provider';
import { publicBaseUrl } from '@/app/config';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/utils/seo';


const almarai = Almarai({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '700', '800'],
  variable: '--font-almarai',
  display: 'swap'
});

const theme = createTheme({
  fontFamily: 'var(--font-almarai), sans-serif',
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  headings: { fontFamily: 'var(--font-almarai), sans-serif' },
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<import('next').Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const isArabic = locale === 'ar';
  
  const baseUrl = 'https://insightabusiness.com';
  
  return {
    metadataBase: new URL(baseUrl),
    applicationName: isArabic ? 'إنسايتا' : 'Insighta',
    title: {
      default: isArabic ? 'إنسايتا - شراء وبيع الرؤى' : 'Insighta - Buy & Sell Insights',
      template: isArabic ? '%s | إنسايتا' : '%s | Insighta',
    },
    description: isArabic 
      ? 'إنسايتا هي منصة لشراء وبيع موارد الرؤى والرؤى والخبرة. اكتشف رؤى الأعمال القيمة من الخبراء.'
      : 'Insighta is a platform for buying and selling insight resources, insights and expertise. Discover valuable business insights from experts.',
    keywords: isArabic
      ? ['رؤى الأعمال', 'تحليل السوق', 'البحث', 'البيانات', 'التقارير', 'الدورات', 'الخبراء']
      : ['business insights', 'market analysis', 'research', 'data', 'reports', 'courses', 'experts'],
    authors: [{ name: 'Insighta Business' }],
    creator: 'Insighta Business',
    publisher: 'Insighta Business',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      url: `${baseUrl}/${locale}`,
      siteName: 'Insighta',
      title: isArabic ? 'إنسايتا - شراء وبيع الرؤى' : 'Insighta - Buy & Sell Insights',
      description: isArabic 
        ? 'إنسايتا هي منصة لشراء وبيع موارد الرؤى والرؤى والخبرة.'
        : 'Insighta is a platform for buying and selling insight resources, insights and expertise.',
      images: [
        {
          url: `${baseUrl}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Insighta Business',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isArabic ? 'إنسايتا - شراء وبيع الرؤى' : 'Insighta - Buy & Sell Insights',
      description: isArabic 
        ? 'إنسايتا هي منصة لشراء وبيع موارد الرؤى والرؤى والخبرة.'
        : 'Insighta is a platform for buying and selling insight resources, insights and expertise.',
      images: [`${baseUrl}/images/og-image.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'en': `${baseUrl}/en`,
        'ar': `${baseUrl}/ar`,
        'x-default': `${baseUrl}/en`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      // Add your verification codes here when available
      // google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
      // yahoo: 'your-yahoo-verification-code',
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon.png', type: 'image/png', sizes: '32x32' },
      ],
      shortcut: '/favicon.ico',
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      other: [
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '192x192',
          url: '/icons-192.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '512x512',
          url: '/icons-512.png',
        },
      ],
    },
  };
}

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({
  children,
  params,
}: LayoutProps) {
  // Properly await the params object
  const resolvedParams = await params;
  const locale = resolvedParams?.locale;
  
  const direction = locale === 'ar' ? 'rtl' : 'ltr';
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
 
  // Get messages for translations
  const messages = await getMessages();

  // Use Almarai for both RTL and LTR
  const fontClass = almarai.variable;
  const fontFamily = 'font-almarai';
  
  return (
    <html lang={locale} dir={direction} className="scroll-smooth">
      <head>
        {/* Favicon and Icons - Explicit definitions for better Google indexing */}
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
        
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-R1XT5PMHG0"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-R1XT5PMHG0', {
                page_path: window.location.pathname,
                page_location: window.location.href,
                send_page_view: false
              });
            `,
          }}
        />
        {/* Add keenicons CSS */}
        <link rel="stylesheet" href="/keenicons.css" />
        <link rel="stylesheet" href="/assets/plugins/keenicons/duotone/style.css" />
        <link rel="stylesheet" href="/assets/plugins/keenicons/outline/style.css" />
        <link rel="stylesheet" href="/assets/plugins/keenicons/solid/style.css" />
        
        {/* Add a client-side script to handle problematic routes */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              var currentLocale = '${locale}';
              // Check if the current path is one of our problematic routes
              var path = window.location.pathname;
              
              // Specifically handle the route that's causing 404s
              if (path === '/' + currentLocale + '/filter-knowledges/topic/139/insight') {
                console.log('Detected problematic route, attempting to handle...');
                
                // This approach won't trigger a full page reload but will update the React router
                if (window.history && window.history.replaceState) {
                  window.history.replaceState(
                    {}, 
                    '', 
                    '/' + currentLocale + '/filter-knowledges/topic/139/insight'
                  );
                  console.log('URL state updated');
                }
              }
              
              // More general detection for filter-knowledges routes
              if (path.includes('/filter-knowledges/')) {
                var pathParts = path.split('/');
                // Check if we have the expected number of segments
                if (pathParts.length === 6) {
                  var locale = pathParts[1];
                  var taxonomy = pathParts[3];
                  var id = pathParts[4];
                  var type = pathParts[5];
                  
                  console.log('Detected filter-knowledges route:', {
                    locale, taxonomy, id, type
                  });
                }
              }
            })();
            `
          }}
        />
      </head>
      <body className={`${fontClass} ${fontFamily} antialiased tracking-tight`} suppressHydrationWarning>
        <MantineProvider theme={theme}>
          <AOSProvider>
            <NextIntlClientProvider messages={messages}>
              {/* Global JSON-LD for Site name and Logo */}
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify(generateWebSiteSchema(locale)),
                }}
              />
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify(generateOrganizationSchema(locale)),
                }}
              />
              <ToastProvider>
                <LoadingProvider>
                  <GlobalProfileProvider>
                    <RoleGuard>
                      <AnalyticsProvider />
                      <GlobalAuthHandler />
                      <ClientLogoutHandler />
                      <Header />
                      <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip" style={{ paddingBottom: 'var(--auth-banner-offset, 0px)' }}>
                        {children}
                      </div>
                      <ConditionalAuthBanner />
                    </RoleGuard>
                  </GlobalProfileProvider>
                </LoadingProvider>
              </ToastProvider>
            </NextIntlClientProvider>
          </AOSProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
