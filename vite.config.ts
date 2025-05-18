import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000,
  },

  server: {
    port: 5300,
  },

  preview: {
    port: 5300,
  },

  plugins: [
    react(),
    tsconfigPaths(),
    svgr({
      include: 'src/shared/assets/**/*.svg',
      svgrOptions: {
        titleProp: true,
        ref: true,
      },
    }),
    mkcert(),
  ],
});
