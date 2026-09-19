import type { User } from '@/components/ui/header/hooks/useUserProfile';
// Global cache for user profile to prevent duplicate API calls across all components
export const globalProfileCache: {
  user: User | null;
  roles: string[];
  lastFetchTime: number;
  isLoading: boolean;
  pendingPromise: Promise<{ user: User | null; roles: string[] }> | null;
  /**
   * When the profile endpoint returns 401/403 for a token, we "block" further
   * profile fetches for the same token to avoid hammering the API every 5s.
   * This gets reset automatically when the token changes (login/logout).
   */
  authFailedToken: string | null;
  sessionToken: string | null;
} = {
  user: null,
  roles: [],
  lastFetchTime: 0,
  isLoading: false,
  pendingPromise: null,
  authFailedToken: null,
  sessionToken: null,
};

