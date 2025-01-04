import { Suspense } from 'react';

import { I18nProvider } from '@/providers/i18n-provider';
import { QueryProvider } from '@/providers/query-provider';
import { RouterProvider } from '@/providers/router-provider';
import { ThemeProvider } from '@/providers/theme-provider';

function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <QueryProvider>
          <Suspense fallback="Fix me...">
            <RouterProvider />
          </Suspense>
        </QueryProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
export default App;
