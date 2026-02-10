import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: {
    resolve: true,
  },
  tsconfig: './tsconfig.json',
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
});

