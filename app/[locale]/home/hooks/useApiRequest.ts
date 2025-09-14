import { useRef, useCallback, useEffect } from 'react';

interface RequestOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  onFinally?: () => void;
}

export function useApiRequest() {
  const abortControllerRef = useRef<AbortController | null>(null);
  const activeRequestRef = useRef<string | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const cancelPreviousRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      activeRequestRef.current = null;
    }
  }, []);

  const makeRequest = useCallback(
    async (
      requestFn: (signal: AbortSignal) => Promise<any>,
      requestId: string,
      options?: RequestOptions
    ) => {
      // Cancel any previous request
      cancelPreviousRequest();

      // Create new abort controller
      abortControllerRef.current = new AbortController();
      activeRequestRef.current = requestId;

      try {
        const result = await requestFn(abortControllerRef.current.signal);
        
        // Only process result if this is still the active request
        if (activeRequestRef.current === requestId) {
          options?.onSuccess?.(result);
        }
        
        return result;
      } catch (error: any) {
        // Ignore abort errors
        if (error.name !== 'AbortError' && activeRequestRef.current === requestId) {
          options?.onError?.(error);
          throw error;
        }
      } finally {
        if (activeRequestRef.current === requestId) {
          options?.onFinally?.();
          abortControllerRef.current = null;
          activeRequestRef.current = null;
        }
      }
    },
    [cancelPreviousRequest]
  );

  return {
    makeRequest,
    cancelPreviousRequest,
    isRequestActive: (requestId: string) => activeRequestRef.current === requestId,
  };
}

// Helper to check if fetch supports AbortSignal
export function createFetchWithSignal(
  url: string,
  options: RequestInit,
  signal: AbortSignal
): Promise<Response> {
  return fetch(url, {
    ...options,
    signal,
  });
}