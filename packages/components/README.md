# @design-system/components

React components for the design system, built with shadcn/ui-style primitives, Tailwind CSS, and the shared `@design-system/core` tokens.

Most applications should consume components via the aggregated `@design-system/design-system` package. Use `@design-system/components` directly when you only need the raw primitives or want tighter control over dependencies.

## Installation

```bash
pnpm add @design-system/components
```

## Usage

### Theme Provider

```tsx
import { ThemeProvider } from '@design-system/components';
import { createTheme } from '@design-system/core';

const customTheme = createTheme({
  colors: {
    primary: {
      500: '#your-color',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* Your app */}
    </ThemeProvider>
  );
}
```

### Components

Components are exported from this package as they are built:

```tsx
import { Button, Input, Card } from '@design-system/components';

function MyComponent() {
  return (
    <Card>
      <Input placeholder="Enter text" />
      <Button>Click me</Button>
    </Card>
  );
}
```

### Using via @design-system/design-system

For most app code, prefer importing from the aggregated package:

```tsx
import { Button, Input, Card } from '@design-system/design-system';
```
