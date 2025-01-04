import { use } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { en, pt } from './languages';

void use(LanguageDetector).init({
  debug: false,
  defaultNS: 'common',
  fallbackLng: 'pt',
  interpolation: { escapeValue: false },
  ns: ['common'],
  resources: {
    en: {
      common: en,
    },
    pt: {
      common: pt,
    },
  },
});
