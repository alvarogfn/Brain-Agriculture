import 'i18next';

import type { pt } from '@/i18n/languages';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: { common: typeof pt };
  }
}
