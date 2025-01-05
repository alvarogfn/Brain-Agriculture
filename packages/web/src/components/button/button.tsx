import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';

import { StyledButton } from './styles';
import type { ButtonProps } from './types';

function Button(
  { ...props }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return <StyledButton {...props} ref={ref} />;
}

export default forwardRef(Button) as typeof Button;
