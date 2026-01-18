/**
 * Shared auth token helpers.
 *
 * Cookie is the primary storage; localStorage is a backward-compatible fallback.
 * This file is intentionally NOT a "use client" module so it can be imported
 * from either client or server code safely (guards prevent accessing browser APIs).
 */

export function getTokenFromCookie(cookieName: string = 'token'): string | null {
  if (typeof document === 'undefined') return null;

  // document.cookie is a single string: "a=1; b=2; token=...".
  const cookies = document.cookie ? document.cookie.split(';') : [];

  for (const rawCookie of cookies) {
    const cookie = rawCookie.trim();
    if (!cookie) continue;

    const eqIndex = cookie.indexOf('=');
    if (eqIndex === -1) continue;

    const name = cookie.slice(0, eqIndex).trim();
    if (name !== cookieName) continue;

    const value = cookie.slice(eqIndex + 1);
    try {
      return decodeURIComponent(value);
    } catch {
      return value;
    }
  }

  return null;
}

export function getAuthToken(): string | null {
  const cookieToken = getTokenFromCookie('token');
  if (cookieToken) return cookieToken;

  // Backward compatibility: some flows may still have the token in localStorage.
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}
