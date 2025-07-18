/**
 * Authentication utilities using localStorage for token management
 * Following the updated authentication system that uses only localStorage
 * instead of combining localStorage and cookies
 */

/**
 * Gets the access token from localStorage
 * @returns The access token or null if not found
 */
export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

/**
 * Sets the access token in localStorage
 * @param token - The access token to store
 */
export function setAccessToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('token', token);
}

/**
 * Removes the access token from localStorage
 */
export function removeAccessToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

/**
 * Checks if a user is authenticated based on token existence
 * @returns Boolean indicating if user is authenticated
 */
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('token');
}
