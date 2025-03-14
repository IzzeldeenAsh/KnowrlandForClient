import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware({
  // A list of all locales that are supporteds
  locales: ['en', 'ar'],
 
  // Used when no locale matches
  defaultLocale: 'en',
  
  // Configure locale detection
  localeDetection: false
});

export const config = {
  // Match internationalized pathnames with explicit support for filter-knowledges routes
  matcher: [
    '/', 
    '/(ar|en)/:path*',
    '/(ar|en)/filter-knowledges/:taxonomy/:id/:type'
  ]
};