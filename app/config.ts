// Environment configuration file

// Force development mode if needed (set to true to always use development URLs)
const FORCE_DEVELOPMENT = false;

// Determine if the code is running in development mode
const isDevelopment = FORCE_DEVELOPMENT || process.env.NODE_ENV === 'development';

// API and App URLs based on environment
export const apiBaseUrl = isDevelopment 
  ? 'https://api.insightabusiness.com' 
  : 'https://api.insightabusiness.com';

export const appBaseUrl = isDevelopment 
  ? 'https://app.insightabusiness.com' 
  : 'https://app.insightabusiness.com';

// Function to get full API URL with path
export const getApiUrl = (path: string): string => {
  return `${apiBaseUrl}${path}`;
};

// Function to get full App URL with path
export const getAppUrl = (path: string): string => {
  return `${appBaseUrl}${path}`;
};

// Stripe configuration
export const getStripePublishableKey = (): string => {
  if (isDevelopment) {
    return 'pk_test_51RvbpiRSMujJZykzGpYlMXB5BXcWcTKrBLcWVtvj3oM2vS9S0z1Ur8YVWPDVSoRTwIoYEDMkvnblr7VbQMCiwwx700TNlixQE6';
  } else {
    return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_51RvbpiRSMujJZykzGpYlMXB5BXcWcTKrBLcWVtvj3oM2vS9S0z1Ur8YVWPDVSoRTwIoYEDMkvnblr7VbQMCiwwx700TNlixQE6';
  }
}