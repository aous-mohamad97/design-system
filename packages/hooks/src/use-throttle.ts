/**
 * Throttle hook for limiting function execution frequency
 */

import { useRef, useCallback, useEffect } from 'react';

/**
 * Hook for throttling a callback function
 */
export function useThrottledCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastRun = useRef<number>(0);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback(
    ((...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastRun.current >= delay) {
        callbackRef.current(...args);
        lastRun.current = now;
      }
    }) as T,
    [delay]
  );
}

