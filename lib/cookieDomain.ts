/**
 * Cookie-domain helpers shared by all auth/session flows.
 *
 * Auth cookies are shared with the Angular dashboard across subdomains, so the
 * Domain attribute must match the environment the app is actually running on:
 *   production: *.insightabusiness.com -> .insightabusiness.com
 *   staging:    *.foresighta.co        -> .foresighta.co
 *   local dev:  localhost              -> no Domain attribute (host-only cookie;
 *               localhost:3000 and localhost:4200 share it via the host)
 */

export function getCookieDomain(): string | null {
  if (typeof window === 'undefined') return null;
  const hostname = window.location.hostname;
  if (hostname.includes('insightabusiness.com')) return '.insightabusiness.com';
  if (hostname.includes('foresighta.co')) return '.foresighta.co';
  return null;
}

/** True on deployed HTTPS hosts (production or staging). */
export function isSharedCookieHost(): boolean {
  return getCookieDomain() !== null;
}

/**
 * Attribute parts for cross-subdomain cookies on deployed hosts:
 * `SameSite=None; Domain=<env domain>; Secure` (Domain omitted on unknown hosts).
 * Spread into the cookie-parts array that gets joined with '; '.
 */
export function sharedCookieAttributes(): string[] {
  const domain = getCookieDomain();
  return domain
    ? ['SameSite=None', `Domain=${domain}`, 'Secure']
    : ['SameSite=None', 'Secure'];
}

/** `Domain=<env domain>; ` fragment for string-built cookies ('' on localhost). */
export function cookieDomainFragment(): string {
  const domain = getCookieDomain();
  return domain ? `Domain=${domain}; ` : '';
}

/** Domain values worth attempting when clearing cookies (undefined = host-only). */
export function cookieDomainsToClear(): (string | undefined)[] {
  const domain = getCookieDomain();
  return domain ? [undefined, domain] : [undefined];
}
