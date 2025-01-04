import type { ForwardedRef} from 'react';
import { forwardRef } from 'react';

import { Icon } from '../icon';
import { StyledButton } from './styles';

import type { IconButtonProps } from '.';

function IconButton(
  {
    color,
    icon,
    iconProps,
    size = 24,
    type = 'button',
    ...props
  }: IconButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return (
    <StyledButton h={size} ref={ref} type={type} w={size} {...props}>
      <Icon {...iconProps} color={color as string} name={icon} />
    </StyledButton>
  );
}

export default forwardRef(IconButton);
