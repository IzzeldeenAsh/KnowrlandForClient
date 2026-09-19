import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({ locales: ['en', 'ar'], defaultLocale: 'en', localeDetection: true, localePrefix: 'always' });
const legacyPages: Record<string, string> = {
  login: 'signin', 'sign-up': 'signup', 'password-reset': 'reset-password',
  'verify-login-email': 'verify-email', 'email-reconfirm': 'verify-email',
  'verify-email': 'verify-email', logout: 'signout', callback: 'callback',
};
export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = pathname.match(/^\/(en|ar)(?:\/|$)/)?.[1] || (request.cookies.get('preferred_language')?.value === 'ar' ? 'ar' : 'en');
  const callback = pathname.match(/^\/(?:(en|ar)\/)?(?:auth\/)?callback(?:\/([^/]+))?\/?$/);
  if (callback) {
    const token = request.nextUrl.searchParams.get('token') || callback[2];
    if (token) {
      const target = new URL(`/${locale}/callback`, request.url);
      const returnUrl = request.nextUrl.searchParams.get('returnUrl');
      if (returnUrl) target.searchParams.set('returnUrl', returnUrl);
      const response = NextResponse.redirect(target, 303);
      // Legacy backend callback compatibility. Angular still requires a readable
      // bearer cookie, so HttpOnly needs a coordinated API/session migration.
      if (/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(token) && token.length < 12000) {
        const host = request.nextUrl.hostname;
        const domain = ['insightabusiness.com', 'foresighta.co'].find(d => host === d || host.endsWith(`.${d}`));
        response.cookies.set('token', token, { path: '/', maxAge: 7 * 86400, sameSite: 'lax', secure: request.nextUrl.protocol === 'https:', ...(domain ? { domain: `.${domain}` } : {}) });
      }
      response.headers.set('Cache-Control', 'no-store');
      response.headers.set('Referrer-Policy', 'no-referrer');
      return response;
    }
  }
  const legacy = pathname.match(/^\/(?:(en|ar)\/)?auth\/([^/]+)\/?$/);
  if (legacy && legacyPages[legacy[2]]) {
    const target = new URL(`/${locale}/${legacyPages[legacy[2]]}`, request.url);
    target.search = request.nextUrl.search;
    target.searchParams.delete('token'); target.searchParams.delete('roles');
    return NextResponse.redirect(target, 307);
  }
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || /\.[a-z0-9]+$/i.test(pathname)) return NextResponse.next();
  if (request.nextUrl.hostname.startsWith('www.')) {
    const target = request.nextUrl.clone(); target.hostname = target.hostname.slice(4);
    return NextResponse.redirect(target, 308);
  }
  const hasLocale = /^\/(en|ar)(?:\/|$)/.test(pathname);
  if (!hasLocale && request.cookies.has('preferred_language')) {
    const target = request.nextUrl.clone(); target.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
    return NextResponse.redirect(target);
  }
  return intlMiddleware(request);
}
export const config = { matcher: ['/', '/(ar|en)/:path*', '/auth/:path*', '/callback/:path*', '/signin', '/signup', '/reset-password', '/verify-email', '/signout'] };
