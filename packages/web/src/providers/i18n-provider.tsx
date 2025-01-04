import type { PropsWithChildren } from 'react';
import { I18nextProvider as ReactI18nProvider } from 'react-i18next';

import i18n from '@/i18n';

export function I18nProvider({ children }: Readonly<PropsWithChildren>) {
  return <ReactI18nProvider i18n={i18n}>{children}</ReactI18nProvider>;
}
