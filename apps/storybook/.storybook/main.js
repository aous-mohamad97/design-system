const { mergeConfig } = require('vite');
const path = require('path');

/** @type {import('@storybook/react-vite').StorybookConfig} */
const config = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-viewport',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    const tailwindcss = (await import('tailwindcss')).default;
    const autoprefixer = (await import('autoprefixer')).default;
    
    // Resolve paths relative to the project root
    // __dirname is apps/storybook/.storybook/, so go up 3 levels to project root
    const projectRoot = path.resolve(__dirname, '../../..');
    
    return mergeConfig(config, {
      resolve: {
        alias: [
          {
            find: '@design-system/core',
            replacement: path.resolve(projectRoot, 'packages/core/src'),
          },
          {
            find: '@design-system/components',
            replacement: path.resolve(projectRoot, 'packages/components/src'),
          },
          {
            find: '@design-system/hooks',
            replacement: path.resolve(projectRoot, 'packages/hooks/src'),
          },
          {
            find: '@design-system/utils',
            replacement: path.resolve(projectRoot, 'packages/utils/src'),
          },
        ],
        extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
      },
      css: {
        postcss: {
          plugins: [
            tailwindcss({
              config: path.resolve(__dirname, '../tailwind.config.js'),
            }),
            autoprefixer(),
          ],
        },
      },
    });
  },
};

module.exports = config;
