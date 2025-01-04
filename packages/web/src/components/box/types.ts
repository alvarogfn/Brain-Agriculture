import type { ComponentPropsWithRef } from "react";

import type { StyledBox } from "./styles";

export interface BoxProps extends ComponentPropsWithRef<typeof StyledBox> {
  as?: keyof HTMLElementTagNameMap;
  "data-testid"?: string;
}
