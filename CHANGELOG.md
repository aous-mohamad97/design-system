# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-27

### Added

- Initial release of design system
- Core package with design tokens, theme system, and Tailwind preset
- Components package with Button, Input, Card, and Badge components
- Hooks package with custom React hooks (useTheme, useMediaQuery, useDebounce, etc.)
- Utils package with utility functions (cn, type guards, array/object/string helpers)
- Main design-system package that re-exports all packages
- Storybook documentation
- TypeScript support throughout
- Theme customization via CSS variables, Tailwind config, and ThemeProvider
- Component variants, sizes, and customization options
- Accessibility features (ARIA attributes, keyboard navigation)

### Components

- **Button**: Multiple variants (default, secondary, destructive, outline, ghost, link, success, warning, info, gradient), sizes, loading states, icons, full width option
- **Badge**: Multiple variants, sizes, dot indicator, icon support
- **Input**: Labels, error states, helper text, icons, password toggle, multiple sizes
- **Card**: Variants (default, outlined, elevated, flat), hoverable, clickable, customizable padding

### Hooks

- `useTheme` - Theme management
- `useMediaQuery`, `useIsMobile`, `useIsTablet`, `useIsDesktop` - Responsive utilities
- `useLocalStorage`, `useSessionStorage` - Storage management
- `useDebounce`, `useDebouncedCallback` - Debouncing utilities
- `useThrottledCallback` - Throttling utility
- `useClickOutside` - Click outside detection
- `useToggle` - Boolean state toggle

### Utilities

- `cn` - Class name utility (clsx + tailwind-merge)
- Type guards (isString, isNumber, isObject, isArray, isDefined)
- Array utilities (unique, groupBy, chunk, flatten)
- Object utilities (omit, pick, deepMerge)
- String utilities (capitalize, kebabCase, camelCase)

[1.0.0]: https://github.com/your-org/design-system/releases/tag/v1.0.0
