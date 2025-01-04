import type { PropsWithChildren } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '@/providers/theme-provider';

import i18nInstance, { I18nextProvider } from '../i18n';

const queryClient = new QueryClient();

export function Providers({ children }: Readonly<PropsWithChildren>) {
  return (
    <I18nextProvider i18n={i18nInstance}>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
}
