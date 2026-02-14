import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

// 1. Custom middleware to handle cookie-based locale detection
function customMiddleware(request: NextRequest) {
  // Enforce canonical host: redirect www. to apex domain
  const host = request.headers.get('host') || '';
  if (host.startsWith('www.')) {
    const url = new URL(request.url);
    url.hostname = host.replace(/^www\./, '');
    return NextResponse.redirect(url, { status: 308 });
  }

  // Get the preferred language from cookie
  const preferredLanguage = request.cookies.get('preferred_language')?.value;
  
  // Get the current pathname
  const pathname = request.nextUrl.pathname;
  const search = request.nextUrl.search;

  // Normalize callback URLs
  const callbackWithTokenMatch = pathname.match(/^\/(en|ar)?\/?callback\/([^/?#]+)\/?$/);
  if (callbackWithTokenMatch) {
    const localeFromPath = callbackWithTokenMatch[1] || (preferredLanguage && ['en','ar'].includes(preferredLanguage) ? preferredLanguage : 'en');
    const rawToken = callbackWithTokenMatch[2];
    // Basic sanity check: looks like a JWT
    if (rawToken.includes('.')) {
      const url = new URL(`/${localeFromPath}/callback`, request.url);
      url.search = search; // start with existing params
      const params = new URLSearchParams(url.search);
      params.set('token', rawToken);
      url.search = params.toString();
      return NextResponse.redirect(url, { status: 307 });
    }
  }
  
  // Check if pathname already has a locale
  const pathnameHasLocale = routing.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  // If no locale in pathname and user has a preferred language cookie
  if (!pathnameHasLocale && preferredLanguage && routing.locales.includes(preferredLanguage as any)) {
    const url = new URL(`/${preferredLanguage}${pathname}`, request.url);
    url.search = request.nextUrl.search;
    return NextResponse.redirect(url);
  }
  
  // If accessing root without locale
  if (pathname === '/') {
    const locale = preferredLanguage && routing.locales.includes(preferredLanguage as any) 
      ? preferredLanguage 
      : routing.defaultLocale;
    const url = new URL(`/${locale}`, request.url);
    return NextResponse.redirect(url);
  }
  
  return null; // Continue to next-intl middleware
}

// 2. Setup next-intl middleware
const intlMiddleware = createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  localeDetection: true,
  localePrefix: 'always'
});

// 3. Main Export
export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isNextInternal =
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_vercel');
  const isStaticAsset =
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    /\.[a-z0-9]+$/i.test(pathname);

  if (isNextInternal || isStaticAsset) {
    return NextResponse.next();
  }

  // First try custom logic
  const customResponse = customMiddleware(request);
  if (customResponse) {
    // >> إصلاح المشكلة هنا: إضافة الهيدر للرد الخاص بالـ Custom Middleware <<
    customResponse.headers.set(
      'Content-Security-Policy', 
      "connect-src 'self' https://api.foresighta.co;"
    );
    return customResponse;
  }
  
  // Fall back to next-intl middleware
  const response = intlMiddleware(request);

  // >> إصلاح المشكلة هنا: إضافة الهيدر للرد النهائي <<
  // هذا السطر يسمح للمتصفح بالاتصال بـ api.foresighta.co
  response.headers.set(
    'Content-Security-Policy', 
    "connect-src 'self' https://api.foresighta.co;"
  );

  return response;
}

export const config = {
  matcher: [
    '/', 
    '/(ar|en)/:path*',
    '/callback'
  ]
};