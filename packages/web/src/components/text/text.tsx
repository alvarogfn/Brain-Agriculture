import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';

import { StyledText } from './styles';

import type { TextProps } from '.';

function Text(
  { ...props }: TextProps,
  ref: ForwardedRef<HTMLParagraphElement>,
) {
  return <StyledText {...props} ref={ref} />;
}

export default forwardRef(Text) as typeof Text;
