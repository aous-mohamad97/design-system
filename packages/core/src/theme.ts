/**
 * Theme utilities for creating and managing custom themes
 */

import { tokens, type ThemeTokens } from './tokens';
import { themeToCSSVariables, generateCSSVariablesString } from './css-variables';

export type Theme = Partial<ThemeTokens>;

/**
 * Create a custom theme by merging with default tokens
 */
export function createTheme(customTheme: Theme): ThemeTokens {
  return {
    colors: { ...tokens.colors, ...customTheme.colors },
    spacing: { ...tokens.spacing, ...customTheme.spacing },
    borderRadius: { ...tokens.borderRadius, ...customTheme.borderRadius },
    fontSize: { ...tokens.fontSize, ...customTheme.fontSize },
    fontWeight: { ...tokens.fontWeight, ...customTheme.fontWeight },
    boxShadow: { ...tokens.boxShadow, ...customTheme.boxShadow },
    zIndex: { ...tokens.zIndex, ...customTheme.zIndex },
    breakpoints: { ...tokens.breakpoints, ...customTheme.breakpoints },
    transition: { ...tokens.transition, ...customTheme.transition },
  } as ThemeTokens;
}

/**
 * Get CSS variables for a theme
 */
export function getCSSVariables(theme?: Theme): Record<string, string> {
  if (!theme) {
    return themeToCSSVariables({});
  }
  return themeToCSSVariables(theme);
}

/**
 * Get CSS string for a theme
 */
export function getThemeCSS(theme?: Theme): string {
  return generateCSSVariablesString(theme);
}

/**
 * Merge multiple themes together
 */
export function mergeThemes(...themes: Theme[]): Theme {
  return themes.reduce((acc, theme) => {
    return {
      colors: { ...acc.colors, ...theme.colors },
      spacing: { ...acc.spacing, ...theme.spacing },
      borderRadius: { ...acc.borderRadius, ...theme.borderRadius },
      fontSize: { ...acc.fontSize, ...theme.fontSize },
      fontWeight: { ...acc.fontWeight, ...theme.fontWeight },
      boxShadow: { ...acc.boxShadow, ...theme.boxShadow },
      zIndex: { ...acc.zIndex, ...theme.zIndex },
      breakpoints: { ...acc.breakpoints, ...theme.breakpoints },
      transition: { ...acc.transition, ...theme.transition },
    };
  }, {} as Theme);
}
