import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const { HOSTNAME, PORT } = env;

  return {
    envPrefix: 'PUBLIC',
    plugins: [
      react(),
      tsconfigPaths({
        projects: [
          './tsconfig.app.json',
          './tsconfig.node.json',
          './tsconfig.json',
        ],
      }),
    ],
    server: {
      host: String(HOSTNAME ?? 'localhost'),
      port: Number(PORT ?? '3000'),
    },
  };
});
