# @design-system/core

Core design tokens, theme system, and Tailwind configuration for the design system.

## Installation

```bash
pnpm add @design-system/core
```

## Usage

### Import CSS Variables

```css
@import '@design-system/core/styles';
```

Or in your JavaScript/TypeScript:

```ts
import '@design-system/core/styles';
```

### Use Tailwind Preset

In your `tailwind.config.js`:

```js
module.exports = {
  presets: [require('@design-system/core/tailwind-preset')],
  // Your other config...
}
```

### Use Design Tokens

```ts
import { tokens, createTheme } from '@design-system/core';

// Use tokens directly
const primaryColor = tokens.colors.primary[500];

// Create custom theme
const customTheme = createTheme({
  colors: {
    primary: {
      500: '#your-color',
    },
  },
});
```

### Override CSS Variables

```css
:root {
  --ds-colors-primary-500: #your-color;
  --ds-spacing-4: 1.5rem;
}
```
