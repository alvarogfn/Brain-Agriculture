import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import App from '@/app';

import './i18n';

const rootElement = document.querySelector('#root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
