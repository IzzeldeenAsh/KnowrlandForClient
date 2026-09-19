/** Shared cookie is the source of truth across Next.js and Angular. */
import { getAuthToken } from '@/lib/authToken';
import { storeSession, clearSession } from '@/lib/auth-client';
export const getAccessToken = getAuthToken;
export function setAccessToken(token: string): void { if (typeof window !== 'undefined') storeSession(token); }
export function removeAccessToken(): void { if (typeof window !== 'undefined') clearSession(); }
export function isAuthenticated(): boolean { return !!getAuthToken(); }
