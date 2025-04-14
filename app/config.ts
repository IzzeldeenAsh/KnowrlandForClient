// Environment configuration file

// Force development mode if needed (set to true to always use development URLs)
const FORCE_DEVELOPMENT = false;

// Determine if the code is running in development mode
const isDevelopment = FORCE_DEVELOPMENT || process.env.NODE_ENV === 'development';

// API and App URLs based on environment
export const apiBaseUrl = isDevelopment 
  ? 'https://api.foresighta.co' 
  : 'https://api.knoldg.com';

export const appBaseUrl = isDevelopment 
  ? 'http://localhost:4000' 
  : 'https://app.knoldg.com';

// Function to get full API URL with path
export const getApiUrl = (path: string): string => {
  return `${apiBaseUrl}${path}`;
};

// Function to get full App URL with path
export const getAppUrl = (path: string): string => {
  return `${appBaseUrl}${path}`;
}; 