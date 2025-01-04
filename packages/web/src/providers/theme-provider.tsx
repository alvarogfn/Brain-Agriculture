import type { PropsWithChildren } from 'react';

import {
  defaultTheme,
  ThemeProvider as StyledThemeProvider,
} from '@xstyled/styled-components';

import { GlobalStyles } from '@/themes/global-styles';

type ThemeProviderProps = PropsWithChildren<{}>;

export function ThemeProvider({ children }: Readonly<ThemeProviderProps>) {
  return (
    <StyledThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      {children}
    </StyledThemeProvider>
  );
}
