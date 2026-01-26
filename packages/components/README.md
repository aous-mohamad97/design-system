# @design-system/components

React components for the design system built with shadcn/ui.

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

Components will be available as they are built:

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
