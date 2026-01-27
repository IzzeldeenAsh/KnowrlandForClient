// Environment configuration file

// Force development mode if needed (set to true to always use development URLs)
const FORCE_DEVELOPMENT = false;

// Determine if the code is running in development mode
const isDevelopment = FORCE_DEVELOPMENT || process.env.NODE_ENV === 'development';

// API and App URLs based on environment
export const apiBaseUrl = isDevelopment 
  ? 'https://api.insightabusiness.com' 
  : 'https://api.insightabusiness.com';

// Public-facing base URL for this Next.js app (used for canonical, sitemap, robots)
// Prefer NEXT_PUBLIC_BASE_URL if provided; otherwise fall back to sensible defaults
export const publicBaseUrl: string =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://insightabusiness.com';

// (Unused at the moment) App URL helper for legacy clients; keep for compatibility
export const appBaseUrl = isDevelopment 
  ? 'https://insightabusiness.com' 
  : 'https://insightabusiness.com';

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
  if (isDevelopment) {
    return 'pk_test_51RpQiFL3mrWP7a0P1OYWGeFJWtgMwcWJtiEDLvn29CpYn5x8Ou77YViA1yoimlixKU5aUAeOeN5VTfoC4sMpvFVF00qq9a6BNm';
  } else {
    return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_51RpQiFL3mrWP7a0P1OYWGeFJWtgMwcWJtiEDLvn29CpYn5x8Ou77YViA1yoimlixKU5aUAeOeN5VTfoC4sMpvFVF00qq9a6BNm';
  }
}