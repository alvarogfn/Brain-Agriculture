import type { ComponentPropsWithRef } from 'react';

import type { Box } from '../box';
import type { StyledInput, StyledLabel } from './styles';

export interface InputProps extends ComponentPropsWithRef<typeof StyledInput> {
  containerProps?: ComponentPropsWithRef<typeof Box>;
  helperText?: string;
  labelProps?: ComponentPropsWithRef<typeof StyledLabel>;
  labelText: string;
}
