import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware({
  // A list of all locales that are supporteds
  locales: ['en', 'ar'],
 
  // Used when no locale matches
  defaultLocale: 'ar',
  
  // Configure locale detection
  localeDetection: false
});

export const config = {
  // Match internationalized pathnames
  matcher: [
    '/', 
    '/(ar|en)/:path*'
  ]
};