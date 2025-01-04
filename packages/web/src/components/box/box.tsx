import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';

import { StyledBox } from './styles';

import type { BoxProps } from '.';

function Box({ ...props }: BoxProps, ref: ForwardedRef<HTMLDivElement>) {
  return <StyledBox {...props} ref={ref} />;
}

export default forwardRef(Box) as typeof Box;
