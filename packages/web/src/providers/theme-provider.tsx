import type { PropsWithChildren } from 'react';

import { ThemeProvider as StyledThemeProvider } from '@xstyled/styled-components';

import { theme } from '@/themes/default';
import { GlobalStyles } from '@/themes/global-styles';

type ThemeProviderProps = PropsWithChildren<{}>;

export function ThemeProvider({ children }: Readonly<ThemeProviderProps>) {
  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </StyledThemeProvider>
  );
}
