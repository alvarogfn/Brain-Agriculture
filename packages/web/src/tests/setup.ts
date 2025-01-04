import '@testing-library/jest-dom/vitest';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});
