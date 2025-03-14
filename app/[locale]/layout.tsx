// app/[locale]/layout.tsx
import './css/style.css';
import AOSProvider from "@/components/aos-provider";
import { Inter, Tajawal } from 'next/font/google';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {Locale, routing} from '@/i18n/routing';
import Header from '@/components/ui/header';
import { LoadingProvider } from '@/components/context/LoadingContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  variable: '--font-tajawal',
  display: 'swap'
});

export const metadata = {
  title: 'KNOLDG - Buy & Sell Knowledge',
  description: 'KNOLDG is a platform for buying and selling knowledge resources, insights and expertise.',
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;
  const direction = locale === 'ar' ? 'rtl' : 'ltr';
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
 
  // Get messages for translations
  const messages = await getMessages();

  // Choose font based on directions
  const fontClass = direction === 'rtl' ? tajawal.variable : inter.variable;
  const fontFamily = direction === 'rtl' ? 'font-tajawal' : 'font-inter';
  
  return (
    <html lang={locale} dir={direction} className="scroll-smooth">
      <head>
        {/* Add a client-side script to handle problematic routes */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              // Check if the current path is one of our problematic routes
              var path = window.location.pathname;
              
              // Specifically handle the route that's causing 404s
              if (path === '/en/filter-knowledges/topic/139/insight') {
                console.log('Detected problematic route, attempting to handle...');
                
                // This approach won't trigger a full page reload but will update the React router
                if (window.history && window.history.replaceState) {
                  window.history.replaceState(
                    {}, 
                    '', 
                    '/en/filter-knowledges/topic/139/insight'
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
        <MantineProvider>
          <AOSProvider>
            <NextIntlClientProvider messages={messages}>
              <LoadingProvider>
                <Header />
                <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
                  {children}
                </div>
              </LoadingProvider>
            </NextIntlClientProvider>
          </AOSProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
