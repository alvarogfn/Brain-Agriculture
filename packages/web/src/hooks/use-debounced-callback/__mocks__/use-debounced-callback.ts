import type { Callback } from '../types';

export function useDebouncedCallback<T extends Callback>(func: T): T {
  return func();
}
