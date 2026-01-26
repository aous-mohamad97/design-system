/** @type {import('tailwindcss').Config} */
// Use source files directly during development
// This allows Storybook to work without building packages first
// Note: jiti (used by Tailwind) can handle TypeScript files
let tailwindPreset;
try {
  // Try to use built preset first (for production)
  tailwindPreset = require('@design-system/core/tailwind-preset');
} catch {
  // Fallback to source TypeScript file during development
  // jiti will transpile it on the fly
  tailwindPreset = require('../../packages/core/src/tailwind-preset.ts').tailwindPreset;
}

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    '../../packages/components/src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [tailwindPreset],
  theme: {
    extend: {
      colors: {
        // Map semantic colors to CSS variables (for shadcn/ui compatibility)
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
};
