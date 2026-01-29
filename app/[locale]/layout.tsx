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
import { generateOrganizationSchema, generateWebSiteSchema } from '@/utils/seo';
import { publicBaseUrl } from '@/app/config';


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
  
  const baseUrl = publicBaseUrl;
  
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
    <div
      dir={direction}
      className={`${fontClass} ${fontFamily} antialiased tracking-tight`}
    >
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
                    <div
                      className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip"
                      style={{ paddingBottom: 'var(--auth-banner-offset, 0px)' }}
                    >
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
    </div>
  );
}
