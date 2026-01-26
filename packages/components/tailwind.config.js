/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/**/*.{ts,tsx}',
  ],
  presets: [require('@design-system/core/tailwind-preset')],
  theme: {
    extend: {},
  },
  plugins: [],
};
