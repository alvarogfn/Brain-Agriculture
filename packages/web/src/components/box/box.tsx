import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';

import { StyledBox } from './styles';

import type { BoxProps } from '.';

function Box(
  { 'data-testid': datatestId = 'box', ...props }: BoxProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return <StyledBox data-testid={datatestId} {...props} ref={ref} />;
}

export default forwardRef(Box) as typeof Box;
