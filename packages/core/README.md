# @design-system/core

Core design tokens, theme system, and Tailwind configuration for the design system.

Most apps will access this functionality via `@design-system/design-system`, but you can depend on `@design-system/core` directly when you only need tokens, theming utilities, or the Tailwind preset.

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
};
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

### Via @design-system/design-system

If you are already using the aggregated package, you can access the same primitives from there:

```ts
import { tokens, createTheme } from '@design-system/design-system';
```
