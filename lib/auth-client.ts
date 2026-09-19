import { globalProfileCache } from './auth-profile-cache';
import type { User } from '@/components/ui/header/hooks/useUserProfile';
import { apiBaseUrl } from '@/app/config';
import { getAuthToken } from './authToken';
import { sharedCookieAttributes, cookieDomainsToClear } from './cookieDomain';

export interface AuthUser {
  id: number; email: string; roles: string[]; verified: boolean;
  name?: string; first_name?: string; last_name?: string; [key: string]: unknown;
}
export class AuthError extends Error {
  constructor(public status: number, message: string, public fields: Record<string, string[]> = {}) { super(message); }
}
export async function authRequest(path: string, locale: string, body?: unknown, options: { method?: string; signal?: AbortSignal; authenticated?: boolean } = {}) {
  const token = options.authenticated === false ? null : getAuthToken();
  const response = await fetch(`${apiBaseUrl}/api/${path}`, {
    method: options.method || (body === undefined ? 'GET' : 'POST'),
    headers: { Accept: 'application/json', 'Accept-Language': locale,
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: 'no-store', signal: options.signal || AbortSignal.timeout(20000),
  });
  const text = await response.text();
  let payload; try { payload = JSON.parse(text); } catch { payload = text; }
  if (!response.ok) throw new AuthError(response.status, payload?.message || (locale === 'ar' ? 'تعذر إكمال الطلب. حاول مجدداً.' : 'Unable to complete your request. Please try again.'), payload?.errors);
  return payload;
}
export function writeAuthCookie(name: string, value: string, age = 3600) {
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${age}; ${sharedCookieAttributes().join('; ')}`;
}
export function storeSession(token: string) {
  if (!token || /[\s;]/.test(token)) throw new Error('Invalid session');
  writeAuthCookie('token', token, 7 * 86400);
  try { for (const key of ['token', 'authToken', 'foresighta-creds']) localStorage.removeItem(key); } catch { /* Storage can be disabled. */ }
  if (getAuthToken() !== token) throw new Error('Cookies are required to sign in.');
}
export function clearSession() {
  for (const name of ['token', 'auth_token', 'auth_user', 'auth_return_url', 'signUpReturnUrl', 'is_social_signup']) {
    for (const domain of cookieDomainsToClear()) {
      for (const path of ['/', '/en', '/ar']) document.cookie = `${name}=; Path=${path}; Max-Age=0; ${domain ? `Domain=${domain};` : ''}`;
    }
  }
  try { for (const key of ['token', 'user', 'authToken', 'currentUser', 'foresighta-creds']) localStorage.removeItem(key); } catch { /* optional storage */ }
  pendingUser = null;
  Object.assign(globalProfileCache, { user: null, roles: [], lastFetchTime: 0, authFailedToken: null, sessionToken: null });
}
// A single-use in-memory handoff avoids another /profile request and never
// persists a bearer token or trusts user data as an authorization boundary.
let pendingUser: { token: string; user: AuthUser; expires: number } | null = null;
export function rememberLoginUser(user: AuthUser) {
  const token = getAuthToken();
  if (token) pendingUser = { token, user, expires: Date.now() + 60000 };
}
export function takeLoginUser(): AuthUser | null {
  const data = pendingUser; pendingUser = null;
  return data && data.token === getAuthToken() && data.expires > Date.now() ? data.user : null;
}
export function authErrorMessage(error: unknown, locale: string, login = false): string {
  if (error instanceof AuthError) {
    if (error.status === 429) return locale === 'ar' ? 'محاولات كثيرة. انتظر قليلاً ثم حاول مجدداً.' : 'Too many attempts. Please wait and try again.';
    if (login && [401, 422].includes(error.status)) return locale === 'ar' ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة.' : 'The email or password is incorrect.';
    return Object.values(error.fields || {}).flat()[0] || error.message;
  }
  return locale === 'ar' ? 'تعذر الاتصال. تحقق من اتصالك وحاول مجدداً.' : 'Unable to connect. Check your connection and try again.';
}

export function seedProfile(user: AuthUser) {
  const { token: _token, ...safe } = user;
  globalProfileCache.user = { ...safe, id: Number(user.id), name: user.name || '', first_name: user.first_name || '', last_name: user.last_name || '', profile_photo_url: user.profile_photo_url || null } as User;
  globalProfileCache.roles = Array.isArray(user.roles) ? user.roles : [];
  globalProfileCache.lastFetchTime = Date.now();
  globalProfileCache.sessionToken = getAuthToken();
  globalProfileCache.authFailedToken = null;
}
