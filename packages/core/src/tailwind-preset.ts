/**
 * Tailwind CSS preset for the design system
 * Consumers can extend this in their tailwind.config.js
 */

import type { Config } from 'tailwindcss';
import { tokens } from './tokens';

/**
 * Tailwind preset configuration
 * This can be imported and used in consumer projects
 */
export const tailwindPreset: Config = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: tokens.colors.primary[50],
          100: tokens.colors.primary[100],
          200: tokens.colors.primary[200],
          300: tokens.colors.primary[300],
          400: tokens.colors.primary[400],
          500: tokens.colors.primary[500],
          600: tokens.colors.primary[600],
          700: tokens.colors.primary[700],
          800: tokens.colors.primary[800],
          900: tokens.colors.primary[900],
          950: tokens.colors.primary[950],
        },
        secondary: {
          50: tokens.colors.secondary[50],
          100: tokens.colors.secondary[100],
          200: tokens.colors.secondary[200],
          300: tokens.colors.secondary[300],
          400: tokens.colors.secondary[400],
          500: tokens.colors.secondary[500],
          600: tokens.colors.secondary[600],
          700: tokens.colors.secondary[700],
          800: tokens.colors.secondary[800],
          900: tokens.colors.secondary[900],
          950: tokens.colors.secondary[950],
        },
        gray: {
          50: tokens.colors.gray[50],
          100: tokens.colors.gray[100],
          200: tokens.colors.gray[200],
          300: tokens.colors.gray[300],
          400: tokens.colors.gray[400],
          500: tokens.colors.gray[500],
          600: tokens.colors.gray[600],
          700: tokens.colors.gray[700],
          800: tokens.colors.gray[800],
          900: tokens.colors.gray[900],
          950: tokens.colors.gray[950],
        },
        success: {
          50: tokens.colors.success[50],
          100: tokens.colors.success[100],
          200: tokens.colors.success[200],
          300: tokens.colors.success[300],
          400: tokens.colors.success[400],
          500: tokens.colors.success[500],
          600: tokens.colors.success[600],
          700: tokens.colors.success[700],
          800: tokens.colors.success[800],
          900: tokens.colors.success[900],
          950: tokens.colors.success[950],
        },
        warning: {
          50: tokens.colors.warning[50],
          100: tokens.colors.warning[100],
          200: tokens.colors.warning[200],
          300: tokens.colors.warning[300],
          400: tokens.colors.warning[400],
          500: tokens.colors.warning[500],
          600: tokens.colors.warning[600],
          700: tokens.colors.warning[700],
          800: tokens.colors.warning[800],
          900: tokens.colors.warning[900],
          950: tokens.colors.warning[950],
        },
        error: {
          50: tokens.colors.error[50],
          100: tokens.colors.error[100],
          200: tokens.colors.error[200],
          300: tokens.colors.error[300],
          400: tokens.colors.error[400],
          500: tokens.colors.error[500],
          600: tokens.colors.error[600],
          700: tokens.colors.error[700],
          800: tokens.colors.error[800],
          900: tokens.colors.error[900],
          950: tokens.colors.error[950],
        },
        background: {
          DEFAULT: tokens.colors.background.DEFAULT,
          secondary: tokens.colors.background.secondary,
          muted: tokens.colors.background.muted,
        },
        foreground: {
          DEFAULT: tokens.colors.foreground.DEFAULT,
          secondary: tokens.colors.foreground.secondary,
          muted: tokens.colors.foreground.muted,
          disabled: tokens.colors.foreground.disabled,
        },
        border: {
          DEFAULT: tokens.colors.border.DEFAULT,
          muted: tokens.colors.border.muted,
          strong: tokens.colors.border.strong,
        },
      },
      spacing: tokens.spacing,
      borderRadius: tokens.borderRadius,
      fontSize: tokens.fontSize,
      fontWeight: tokens.fontWeight,
      boxShadow: tokens.boxShadow,
      zIndex: tokens.zIndex,
      screens: tokens.breakpoints,
      transitionDuration: tokens.transition.duration,
      transitionTimingFunction: tokens.transition.timing,
    },
  },
};

export default tailwindPreset;
