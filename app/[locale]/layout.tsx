// app/[locale]/layout.tsx
import './css/style.css';
import AOSProvider from "@/components/aos-provider";
import { Inter } from 'next/font/google';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {Locale, routing} from '@/i18n/routing';
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // const {locale} = await params
  // Set direction to 'rtl' for Arabic, otherwise 'ltr'
  const { locale} = await params;
  const direction = locale === 'ar' ? 'rtl' : 'ltr';
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
 
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang={locale} dir={direction} className="scroll-smooth">
      <head />
      <body className={`${inter.variable} font-inter antialiased tracking-tight`} suppressHydrationWarning>
        <MantineProvider>
          <AOSProvider>
      <NextIntlClientProvider messages={messages}>
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


