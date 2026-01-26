import { defineConfig } from 'tsup';
import { copyFileSync } from 'fs';
import { join } from 'path';

export default defineConfig({
  entry: ['src/index.ts', 'src/tailwind-preset.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  tsconfig: './tsconfig.json',
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['tailwindcss'],
  treeshake: true,
  onSuccess: () => {
    // Copy CSS file to dist
    try {
      copyFileSync(join(__dirname, 'src', 'styles.css'), join(__dirname, 'dist', 'styles.css'));
    } catch (error) {
      // File might not exist, that's okay
    }
  },
});
