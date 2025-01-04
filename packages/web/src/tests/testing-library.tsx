/* eslint-disable @typescript-eslint/no-restricted-imports */
import type { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { queries, Queries } from '@testing-library/dom';
import type { RenderOptions, RenderResult } from '@testing-library/react';
import { render } from '@testing-library/react';

import { ThemeProvider } from '@/providers/theme-provider';

import i18nInstance, { I18nextProvider } from '../i18n';

const queryClient = new QueryClient();

function customRender<
  Container extends HTMLElement,
  BaseElement extends Container,
  Q extends Queries = typeof queries,
>(
  ui: ReactNode,
  options?: RenderOptions<Q, Container, BaseElement>,
): RenderResult<Q, Container, BaseElement> {
  return render(ui, {
    wrapper: ({ children }) => (
      <I18nextProvider i18n={i18nInstance}>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </ThemeProvider>
      </I18nextProvider>
    ),
    ...options,
  });
}

// eslint-disable-next-line import-x/export
export * from '@testing-library/react';

// eslint-disable-next-line import-x/export
export { customRender as render };
