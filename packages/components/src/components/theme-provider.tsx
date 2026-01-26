/**
 * Theme Provider component for runtime theme customization
 */

import React, { createContext, useContext, useEffect, useMemo } from 'react';
import type { Theme } from '@design-system/core';
import { getCSSVariables } from '@design-system/core';

interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: Theme;
  defaultTheme?: 'light' | 'dark' | 'system';
}

interface ThemeContextValue {
  theme?: Theme;
}

const ThemeContext = createContext<ThemeContextValue>({});

/**
 * Theme Provider component
 * Injects CSS variables based on theme configuration
 */
export function ThemeProvider({
  children,
  theme,
  defaultTheme = 'system',
}: ThemeProviderProps) {
  const cssVariables = useMemo(() => {
    if (!theme) return {};
    return getCSSVariables(theme);
  }, [theme]);

  useEffect(() => {
    if (!theme || Object.keys(cssVariables).length === 0) return;

    const root = document.documentElement;
    Object.entries(cssVariables).forEach(([key, value]) => {
      root.style.setProperty(key, String(value));
    });

    return () => {
      // Cleanup: remove custom variables when theme changes
      Object.keys(cssVariables).forEach((key) => {
        root.style.removeProperty(key);
      });
    };
  }, [cssVariables, theme]);

  const value = useMemo(() => ({ theme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Hook to access theme context
 */
export function useThemeContext() {
  const context = useContext(ThemeContext);
  return context;
}
