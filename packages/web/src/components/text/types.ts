import type { ComponentPropsWithRef, ReactNode } from 'react';

import type { StyledText } from './styles';

export interface TextProps extends ComponentPropsWithRef<typeof StyledText> {
  as?:
    | 'emphasis'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'span'
    | 'strong';
  children?: ReactNode;
}
