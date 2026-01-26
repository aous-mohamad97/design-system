# @design-system/design-system

Complete design system package - re-exports all components, hooks, utils, and core functionality.

## Installation

```bash
pnpm add @design-system/design-system
```

## Quick Start

```tsx
import { Button, Input, Card, useTheme, ThemeProvider } from '@design-system/design-system';
import '@design-system/design-system/styles';

function App() {
  return (
    <ThemeProvider>
      <Card>
        <Input placeholder="Enter text" />
        <Button>Click me</Button>
      </Card>
    </ThemeProvider>
  );
}
```

## Using Tailwind Preset

In your `tailwind.config.js`:

```js
module.exports = {
  presets: [require('@design-system/design-system/tailwind-preset')],
  // Your other config...
}
```

## Customization

### CSS Variables Override

```css
:root {
  --ds-colors-primary-500: #your-color;
}
```

### Theme Provider

```tsx
import { ThemeProvider, createTheme } from '@design-system/design-system';

const customTheme = createTheme({
  colors: {
    primary: {
      500: '#your-color',
    },
  },
});

<ThemeProvider theme={customTheme}>
  <App />
</ThemeProvider>
```

## Package Structure

This package re-exports from:
- `@design-system/core` - Design tokens, theme system, Tailwind preset
- `@design-system/components` - React components
- `@design-system/hooks` - Custom React hooks
- `@design-system/utils` - Utility functions

You can also install these packages individually if you only need specific functionality.
