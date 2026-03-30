const DEFAULT_LOCAL_ANGULAR_APP_URL =
  process.env.NEXT_PUBLIC_ANGULAR_APP_URL || "https://app.insightabusiness.com";

const ANGULAR_ROUTE_PREFIXES = [
  "/app/",
  "/admin-dashboard/",
];

const LOCALHOST_HOSTNAMES = new Set(["localhost", "127.0.0.1"]);

const isAbsoluteHttpUrl = (url: string): boolean => /^https?:\/\//i.test(url);

const isLocalhost = (hostname: string): boolean =>
  LOCALHOST_HOSTNAMES.has(hostname);

const isKnownAngularOrigin = (url: URL): boolean =>
  url.hostname.startsWith("app.") ||
  (isLocalhost(url.hostname) && url.port !== "3000");

const extractKnownAngularOrigin = (url?: string | null): string | null => {
  if (!url || !isAbsoluteHttpUrl(url)) {
    return null;
  }

  try {
    const parsed = new URL(url);
    return isKnownAngularOrigin(parsed) ? parsed.origin : null;
  } catch {
    return null;
  }
};

export const normalizeAngularPath = (path: string): string => {
  const withoutLocale = (path.replace(/^\/(en|ar)(?=\/|$)/, "") || "/").trim();
  return withoutLocale.startsWith("/") ? withoutLocale : `/${withoutLocale}`;
};

export const isAngularPath = (path: string): boolean => {
  const pathOnly = path.split("?")[0].split("#")[0];
  const normalized = normalizeAngularPath(pathOnly);
  return ANGULAR_ROUTE_PREFIXES.some((prefix) => normalized.startsWith(prefix));
};

export const isAngularRouteUrl = (url: string): boolean => {
  if (!url) {
    return false;
  }

  if (typeof window === "undefined") {
    return isAngularPath(url);
  }

  try {
    const parsed = new URL(url, window.location.origin);
    return isAngularPath(parsed.pathname);
  } catch {
    return isAngularPath(url);
  }
};

export const getAngularAppOrigin = (returnUrl?: string | null): string => {
  if (typeof window === "undefined") {
    return DEFAULT_LOCAL_ANGULAR_APP_URL;
  }

  const fromReturnUrl = extractKnownAngularOrigin(returnUrl);
  if (fromReturnUrl) {
    return fromReturnUrl;
  }

  const fromReferrer = extractKnownAngularOrigin(document.referrer);
  if (fromReferrer) {
    return fromReferrer;
  }

  const { protocol, hostname } = window.location;

  if (hostname.includes("foresighta.co")) {
    return `${protocol}//app.foresighta.co`;
  }

  if (hostname.includes("insightabusiness.com")) {
    return `${protocol}//app.insightabusiness.com`;
  }

  return DEFAULT_LOCAL_ANGULAR_APP_URL;
};

export const toAngularAppUrl = (url: string): string => {
  if (typeof window === "undefined" || !url) {
    return url;
  }

  const parsed = new URL(url, window.location.origin);
  parsed.pathname = normalizeAngularPath(parsed.pathname);

  if (isAbsoluteHttpUrl(url) && isKnownAngularOrigin(parsed)) {
    return parsed.toString();
  }

  return `${getAngularAppOrigin(url)}${parsed.pathname}${parsed.search}${parsed.hash}`;
};
