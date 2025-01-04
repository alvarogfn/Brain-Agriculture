import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  resolve: {
    alias: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
  },
  test: {
    coverage: {
      exclude: [
        'src/providers/**/*.tsx',
        'src/__mocks__/**/*.ts',
        'src/**/*.d.ts',
        'src/**/*.test.ts',
        'src/**/*.test.tsx',
      ],
      extension: ['.ts', '.tsx'],
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      provider: 'istanbul',
      reporter: ['text', 'json-summary', 'html', 'clover'],
      reportOnFailure: true,
      thresholds: {
        '**/*.(ts|tsx)': {
          branches: 100,
          functions: 100,
          lines: 100,
        },
        branches: 100,
        functions: 100,
        lines: 100,
      },
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/tests/setup.ts'],
    watch: false,
  },
});
