import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { en, pt } from './languages';

void i18n.use(LanguageDetector).init({
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

export { default } from 'i18next';
