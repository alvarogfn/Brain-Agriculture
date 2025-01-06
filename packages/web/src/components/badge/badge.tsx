import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';

import {
  StyledButton,
  StyledContainer,
  StyledIcon,
  StyledText,
} from './styles';
import type { BadgeProps } from './types';

function Badge(
  { children, onRemove, showRemoveButton, ...props }: BadgeProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <StyledContainer ref={ref} {...props}>
      <StyledText title={children}>{children}</StyledText>
      {showRemoveButton && (
        <StyledButton onClick={onRemove} type="button">
          <StyledIcon name="close" width="15px" />
        </StyledButton>
      )}
    </StyledContainer>
  );
}

export default forwardRef(Badge) as typeof Badge;
