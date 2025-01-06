import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';

import { StyledMenuItem } from './styles';

import type { MenuItemProps } from '.';

function MenuItem(
  { as = 'li', children, ...props }: MenuItemProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <StyledMenuItem as={as} ref={ref} tabIndex={0} {...props}>
      {children}
    </StyledMenuItem>
  );
}

export default forwardRef(MenuItem);
