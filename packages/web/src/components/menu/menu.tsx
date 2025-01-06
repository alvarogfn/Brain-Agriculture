import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';

import { MenuItem } from './menu-item';
import { StyledMenu } from './styles';
import type { MenuProps } from './types';

function Menu(
  { as = 'ul', children, ...props }: MenuProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <StyledMenu as={as} ref={ref} {...props}>
      {children}
    </StyledMenu>
  );
}

export default Object.assign(forwardRef(Menu), {
  Item: MenuItem,
});
