# @design-system/design-system

Complete design system package – re-exports components, hooks, utils, and core functionality from the individual workspace packages.

This is the **recommended entrypoint** for most applications.

## Installation

```bash
pnpm add @design-system/design-system
```

## Quick start

```tsx
import {
  Button,
  Input,
  Card,
  ThemeProvider,
  useTheme,
} from '@design-system/design-system';
import '@design-system/design-system/styles';

function App() {
  const { theme, setTheme } = useTheme();

  return (
    <ThemeProvider>
      <Card>
        <Input placeholder="Enter text" />
        <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          Toggle theme
        </Button>
      </Card>
    </ThemeProvider>
  );
}
```

## Using Tailwind preset

In your `tailwind.config.js`:

```js
module.exports = {
  presets: [require('@design-system/design-system/tailwind-preset')],
  // Your other config...
};
```

## Customization

### CSS variables override

```css
:root {
  --ds-colors-primary-500: #your-color;
}
```

### Theme provider with custom theme

```tsx
import { ThemeProvider, createTheme } from '@design-system/design-system';

const customTheme = createTheme({
  colors: {
    primary: {
      500: '#your-color',
    },
  },
});

function Root() {
  return (
    <ThemeProvider theme={customTheme}>
      <App />
    </ThemeProvider>
  );
}
```

## Package structure

This package re-exports from:

- `@design-system/core` – design tokens, theme system, Tailwind preset
- `@design-system/components` – React components
- `@design-system/hooks` – custom React hooks
- `@design-system/utils` – utility functions

You can also install these packages individually if you only need specific functionality.
