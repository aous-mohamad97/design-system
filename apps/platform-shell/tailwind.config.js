/** @type {import('tailwindcss').Config} */
const tailwindPreset = require('@design-system/core/tailwind-preset').tailwindPreset;

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  presets: [tailwindPreset],
  theme: { extend: {} },
  plugins: [],
};
