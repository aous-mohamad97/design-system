import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'claims',
      filename: 'remoteEntry.js',
      exposes: { './ClaimsApp': './src/ClaimsApp.tsx' },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
  server: { port: 5002 },
  build: { target: 'esnext', modulePreload: false, minify: false, cssCodeSplit: false },
});
