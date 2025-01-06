import type { ComponentPropsWithRef } from 'react';

import type { StyledContainer } from './styles';

export interface BadgeProps
  extends ComponentPropsWithRef<typeof StyledContainer> {
  as?: keyof HTMLElementTagNameMap;
  children: string;
  onRemove?: () => void;
  showRemoveButton?: boolean;
}
