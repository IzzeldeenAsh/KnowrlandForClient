/** Pure URL policy shared by auth entry points and tested without browser state. */
export function safeReturnUrl(value: string | null | undefined, siteOrigin: string, angularOrigin: string): string | null {
  if (!value || value !== value.trim() || /[\\\u0000-\u001f\u007f]/.test(value)) return null;
  try {
    const site = new URL(siteOrigin).origin;
    const angular = new URL(angularOrigin).origin;
    const url = new URL(value, site);
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) return null;
    if (url.origin !== site && url.origin !== angular) return null;
    const decodedPath = decodeURIComponent(url.pathname);
    if (/[\\\u0000-\u001f\u007f]/.test(decodedPath) || decodedPath.startsWith('//')) return null;
    const path = url.pathname.replace(/^\/(en|ar)(?=\/|$)/, '') || '/';
    // Never loop back into an auth entry point or carry a credential forward.
    if (/^\/(auth(?:\/|$)|signin(?:\/|$)|signup(?:\/|$)|callback(?:\/|$)|signout(?:\/|$)|reset-password(?:\/|$)|verify-email(?:\/|$))/.test(path)) return null;
    for (const key of ['token', 'access_token', 'auth_token']) url.searchParams.delete(key);
    const angularPath = path.startsWith('/app/') || path.startsWith('/admin-dashboard/');
    if (angularPath) return `${angular}${path}${url.search}${url.hash}`;
    if (url.origin === angular) return null;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch { return null; }
}

export function verificationUrl(value: string, apiOrigin: string): string | null {
  try {
    const base = new URL(apiOrigin).origin;
    const url = new URL(value.startsWith('/') || /^https?:/.test(value) ? value : `/api/email/verify/${value}`, base);
    if (url.origin !== base || url.username || url.password || !url.pathname.startsWith('/api/email/verify/')) return null;
    return url.href;
  } catch { return null; }
}
