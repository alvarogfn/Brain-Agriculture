import type { ComponentPropsWithRef } from 'react';

import type { StyledMenu } from './styles';

export interface MenuProps extends ComponentPropsWithRef<typeof StyledMenu> {
  as?: keyof HTMLElementTagNameMap;
}
