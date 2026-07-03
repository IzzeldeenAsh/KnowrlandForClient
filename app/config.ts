// Environment configuration
//
// All values come from NEXT_PUBLIC_* env vars, resolved at build time:
//   next dev              -> .env.development  (localhost + stage API + test keys)
//   npm run build:stage   -> .env.staging      (foresighta.co + test keys)
//   npm run build         -> .env.production   (insightabusiness.com + live keys)
//
// Fallbacks are production values so a build with missing env vars fails safe.

// Backend API (no trailing slash)
export const apiBaseUrl: string =
  process.env.NEXT_PUBLIC_API_URL || 'https://api.insightabusiness.com';

// Public-facing base URL of this Next.js app (canonical, sitemap, robots)
export const publicBaseUrl: string =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://insightabusiness.com';

// Angular dashboard app (insighters/companies)
export const dashboardUrl: string =
  process.env.NEXT_PUBLIC_DASHBOARD_URL || 'https://app.insightabusiness.com';

// Legacy alias kept for compatibility
export const appBaseUrl: string = publicBaseUrl;

// Function to get full API URL with path
export const getApiUrl = (path: string): string => {
  return `${apiBaseUrl}${path}`;
};

// Function to get full App URL with path
export const getAppUrl = (path: string): string => {
  return `${publicBaseUrl}${path}`;
};

// Stripe configuration
export const getStripePublishableKey = (): string => {
  return (
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
    'pk_live_51RvbpYRIE7WtDi9SLKPBxKTPyTkULT1e36AZMOcmtUomKgW99akiph2PVg5mmUcPtyAjvlXwP1wy70OFvooJLpQc00CNQYKb96'
  );
};
