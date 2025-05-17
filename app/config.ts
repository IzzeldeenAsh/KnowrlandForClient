// Environment configuration file

// Force development mode if needed (set to true to always use development URLs)
const FORCE_DEVELOPMENT = false;

// Determine if the code is running in development mode
const isDevelopment = FORCE_DEVELOPMENT || process.env.NODE_ENV === 'development';

// API and App URLs based on environment
export const apiBaseUrl = isDevelopment 
  ? 'https://api.knoldg.com' 
  : 'https://api.knoldg.com';

export const appBaseUrl = isDevelopment 
  ? 'http://localhost:4200' 
  : 'http://localhost:4200';

// Function to get full API URL with path
export const getApiUrl = (path: string): string => {
  return `${apiBaseUrl}${path}`;
};

// Function to get full App URL with path
export const getAppUrl = (path: string): string => {
  return `${appBaseUrl}${path}`;
}; 