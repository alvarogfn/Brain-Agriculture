import type { ComponentPropsWithRef } from 'react';

import type { StyledMenuItem } from './styles';

export interface MenuItemProps
  extends ComponentPropsWithRef<typeof StyledMenuItem> {
  as?: keyof HTMLElementTagNameMap;
}
