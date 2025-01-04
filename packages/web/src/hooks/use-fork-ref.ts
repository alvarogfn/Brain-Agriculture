import { useMemo } from 'react';
import type { MutableRefObject, Ref, RefCallback } from 'react';

const setRef = <T>(
  ref:
    | ((instance: null | T) => void)
    | MutableRefObject<null | T>
    | null
    | undefined,
  value: null | T,
) => {
  if (typeof ref === 'function') ref(value);
  else if (ref) ref.current = value;
};

export const useForkRef = <Instance>(
  ...refs: Array<Ref<Instance> | undefined>
): null | RefCallback<Instance> =>
  useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null;
    }

    return (instance) => {
      for (const ref of refs) {
        setRef(ref, instance);
      }
    };
  }, refs);
