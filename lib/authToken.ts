/**
 * Shared auth token helpers.
 *
 * The shared cookie is the single source of truth across both frontends.
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
  // A missing shared cookie means logged out. Never resurrect a stale token
  // from origin-local storage after logging out of the other frontend.
  return getTokenFromCookie('token');
}
