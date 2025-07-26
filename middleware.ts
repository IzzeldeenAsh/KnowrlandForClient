import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

// Custom middleware to handle cookie-based locale detection
function customMiddleware(request: NextRequest) {
  // Get the preferred language from cookie
  const preferredLanguage = request.cookies.get('preferred_language')?.value;
  
  // Get the current pathname
  const pathname = request.nextUrl.pathname;
  
  // Check if pathname already has a locale
  const pathnameHasLocale = routing.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  // If no locale in pathname and user has a preferred language cookie
  if (!pathnameHasLocale && preferredLanguage && routing.locales.includes(preferredLanguage as any)) {
    // Redirect to the preferred language
    const url = new URL(`/${preferredLanguage}${pathname}`, request.url);
    url.search = request.nextUrl.search; // Preserve query parameters
    return NextResponse.redirect(url);
  }
  
  // If accessing root without locale, redirect to preferred language or default
  if (pathname === '/') {
    const locale = preferredLanguage && routing.locales.includes(preferredLanguage as any) 
      ? preferredLanguage 
      : routing.defaultLocale;
    const url = new URL(`/${locale}`, request.url);
    return NextResponse.redirect(url);
  }
  
  return null; // Continue to next-intl middleware
}

const intlMiddleware = createMiddleware({
  // A list of all locales that are supporteds
  locales: ['en', 'ar'],
 
  // Used when no locale matches
  defaultLocale: 'en',
  
  // Configure locale detection - enable it to respect cookies and browser preferences
  localeDetection: true,
  
  // Custom locale prefix strategy
  localePrefix: 'always'
});

export default function middleware(request: NextRequest) {
  // First try custom cookie-based logic
  const customResponse = customMiddleware(request);
  if (customResponse) {
    return customResponse;
  }
  
  // Fall back to next-intl middleware
  return intlMiddleware(request);
}

export const config = {
  // Match internationalized pathnames
  matcher: [
    '/', 
    '/(ar|en)/:path*'
  ]
};