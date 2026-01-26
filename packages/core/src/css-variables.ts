/**
 * CSS Variable generation from design tokens
 * Converts design tokens to CSS custom properties
 */

import { tokens, type ThemeTokens } from './tokens';

/**
 * Flatten nested object to dot notation keys
 */
function flattenObject(
  obj: Record<string, any>,
  prefix = '',
  result: Record<string, string> = {}
): Record<string, string> {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = prefix ? `${prefix}-${key}` : key;
      const value = obj[key];

      if (value && typeof value === 'object' && !Array.isArray(value)) {
        // Handle objects with lineHeight (fontSize)
        if ('lineHeight' in value || Array.isArray(value)) {
          // Skip, these are handled separately
          continue;
        }
        flattenObject(value, newKey, result);
      } else {
        result[`--ds-${newKey}`] = String(value);
      }
    }
  }
  return result;
}

/**
 * Generate CSS variables from tokens
 */
export function generateCSSVariables(customTokens?: Partial<ThemeTokens>): Record<string, string> {
  const tokensToUse = customTokens ? { ...tokens, ...customTokens } : tokens;
  return flattenObject(tokensToUse);
}

/**
 * Generate CSS string with all variables
 */
export function generateCSSVariablesString(customTokens?: Partial<ThemeTokens>): string {
  const variables = generateCSSVariables(customTokens);
  const cssVars = Object.entries(variables)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');

  return `:root {\n${cssVars}\n}\n`;
}

/**
 * Get all CSS variable names
 */
export function getCSSVariableNames(): string[] {
  const variables = generateCSSVariables();
  return Object.keys(variables);
}

/**
 * Get CSS variable value by token path
 * Example: getCSSVariable('colors.primary.500') => '--ds-colors-primary-500'
 */
export function getCSSVariableName(tokenPath: string): string {
  const parts = tokenPath.split('.');
  return `--ds-${parts.join('-')}`;
}

/**
 * Convert theme object to CSS variables object
 * Useful for ThemeProvider
 */
export function themeToCSSVariables(theme: Partial<ThemeTokens>): Record<string, string> {
  return generateCSSVariables(theme);
}
