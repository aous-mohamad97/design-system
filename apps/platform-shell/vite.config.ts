import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'platform_shell',
      remotes: {
        // Remote must be served from build (see README: run claims build + preview, then shell dev)
        claims: 'http://localhost:5002/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
  server: { port: 5173 },
  build: {
    target: 'esnext',
    modulePreload: false,
    minify: false,
    cssCodeSplit: false,
  },
  resolve: {
    alias: {
      '@design-system/core': new URL('../../packages/core/src', import.meta.url).pathname,
      '@design-system/components': new URL('../../packages/components/src', import.meta.url).pathname,
      '@design-system/design-system': new URL('../../packages/design-system/src', import.meta.url).pathname,
      '@design-system/tenant-config': new URL('../../packages/tenant-config/src', import.meta.url).pathname,
    },
  },
});
