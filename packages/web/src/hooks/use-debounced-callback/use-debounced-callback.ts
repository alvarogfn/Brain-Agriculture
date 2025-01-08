import { useCallback, useEffect, useRef } from 'react';

import type { Callback } from './types';

export function useDebouncedCallback<T extends Callback>(
  func: T,
  wait: number,
): T {
  const intervalRef: { current: NodeJS.Timeout | null } = useRef(null);

  useEffect(
    () => () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    },
    [],
  );

  return useCallback(
    (...args: []) => {
      const later = () => {
        clearTimeout(intervalRef.current as NodeJS.Timeout);
        func(...args);
      };

      clearTimeout(intervalRef.current as NodeJS.Timeout);
      intervalRef.current = setTimeout(later, wait);
    },
    [func, wait],
  ) as T;
}

export default useDebouncedCallback;
