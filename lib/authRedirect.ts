import { dashboardUrl, publicBaseUrl } from '@/app/config';
import { safeReturnUrl } from './auth-policy';

export const normalizeAngularPath = (path: string): string => path.replace(/^\/(en|ar)(?=\/|$)/, '') || '/';
export const isAngularPath = (path: string): boolean => /^\/(app|admin-dashboard)\//.test(normalizeAngularPath(path));
export const getAngularAppOrigin = (_returnUrl?: string | null): string => new URL(dashboardUrl).origin;
export const isAngularRouteUrl = (value: string): boolean => {
  try { return isAngularPath(new URL(value, publicBaseUrl).pathname); } catch { return false; }
};
export const getSafeReturnUrl = (value?: string | null): string | null =>
  safeReturnUrl(value, typeof window === 'undefined' ? publicBaseUrl : window.location.origin, dashboardUrl);
export const toAngularAppUrl = (value: string): string =>
  getSafeReturnUrl(value) || `${getAngularAppOrigin()}/app/insighter-dashboard/my-dashboard`;

export function authPageUrl(page: 'signin' | 'signup' | 'reset-password' | 'verify-email' | 'signout', locale = 'en', returnUrl?: string | null): string {
  const language = locale === 'ar' ? 'ar' : 'en';
  const destination = getSafeReturnUrl(returnUrl);
  return `/${language}/${page}${destination ? `?returnUrl=${encodeURIComponent(destination)}` : ''}`;
}
