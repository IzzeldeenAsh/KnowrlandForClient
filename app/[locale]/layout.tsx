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

  // Choose font based on direction
  const fontClass = direction === 'rtl' ? tajawal.variable : inter.variable;
  const fontFamily = direction === 'rtl' ? 'font-tajawal' : 'font-inter';
  
  return (
    <html lang={locale} dir={direction} className="scroll-smooth">
      <head />
      <body className={`${fontClass} ${fontFamily} antialiased tracking-tight`} suppressHydrationWarning>
        <MantineProvider>
          <AOSProvider>
            <NextIntlClientProvider messages={messages}>
              <Header />
              <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
                {children}
              </div>
            </NextIntlClientProvider>
          </AOSProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
