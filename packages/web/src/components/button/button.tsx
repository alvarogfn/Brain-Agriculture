import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';

import { StyledButton } from './styles';
import type { ButtonProps } from './types';

function Button(
  { $variant, ...props }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return <StyledButton $variant={$variant} {...props} ref={ref} />;
}

export default forwardRef(Button) as typeof Button;
