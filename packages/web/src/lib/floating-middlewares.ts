import { size } from "@floating-ui/react";

export function sameWidth() {
  return size({
    apply({ elements, rects }) {
      Object.assign(elements.floating.style, {
        minWidth: `${rects.reference.width}px`,
      });
    },
  });
}
