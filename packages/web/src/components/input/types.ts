import type { ComponentPropsWithRef, ReactNode } from 'react';

import type { Box } from '../box';
import type { StyledInput } from './styles';

export type InputProps = {
  containerProps?: ComponentPropsWithRef<typeof Box>;
  'data-testid'?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
} & Omit<ComponentPropsWithRef<typeof StyledInput>, 'prefix'> &
  StyledTextboxProps;

export type StyledTextboxProps = {
  hasError?: boolean;
};
