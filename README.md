# Design System

A React design system built with TypeScript, Tailwind CSS, and shadcn/ui. Published as npm packages for use across projects.

## Packages

| Package | Description |
|---------|-------------|
| `@design-system/core` | Design tokens, theme utilities, Tailwind preset |
| `@design-system/components` | React UI components |
| `@design-system/hooks` | Custom React hooks |
| `@design-system/utils` | Utility functions |
| `@design-system/design-system` | Main package (re-exports all) |

## Installation
 
```bash
pnpm add @design-system/design-system
```

Or install individual packages:

```bash
pnpm add @design-system/core @design-system/components @design-system/hooks @design-system/utils
```

## Setup

1. Import styles in your app entry point:

```tsx
import '@design-system/design-system/styles';
```

2. Configure Tailwind in `tailwind.config.js`:

```js
module.exports = {
  presets: [require('@design-system/design-system/tailwind-preset')],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@design-system/components/dist/**/*.{js,jsx,ts,tsx}',
  ],
};
```

3. Use components:

```tsx
import { Button, Input, Card, ThemeProvider } from '@design-system/design-system';

function App() {
  return (
    <ThemeProvider>
      <Card>
        <Input label="Email" type="email" placeholder="you@example.com" />
        <Button variant="default" size="lg">Submit</Button>
      </Card>
    </ThemeProvider>
  );
}
```

## Components

### Button

Variants: `default`, `secondary`, `destructive`, `outline`, `ghost`, `link`, `success`, `warning`, `info`, `gradient`

Sizes: `sm`, `default`, `lg`, `xl`, `icon`, `icon-sm`, `icon-lg`

```tsx
import { Button } from '@design-system/components';

<Button>Click me</Button>
<Button variant="destructive" loading loadingText="Deleting...">Delete</Button>
<Button leftIcon={<PlusIcon />} rightIcon={<ArrowIcon />}>Add Item</Button>
<Button fullWidth rounded="full">Full Width</Button>
```

Props:
- `loading` - Show loading spinner
- `loadingText` - Text displayed while loading
- `leftIcon` / `rightIcon` - React nodes for icons
- `fullWidth` - Full width button
- `rounded` - Border radius: `default`, `none`, `sm`, `lg`, `xl`, `full`
- `classNames` - Custom class names object

### Badge

Variants: `default`, `secondary`, `destructive`, `outline`, `success`, `warning`, `info`, `muted`

Sizes: `sm`, `default`, `lg`, `xl`

```tsx
import { Badge } from '@design-system/components';

<Badge>New</Badge>
<Badge variant="success" dot>Online</Badge>
<Badge leftIcon={<CheckIcon />} variant="success">Verified</Badge>
```

Props:
- `dot` - Show dot indicator
- `dotColor` - Custom dot color (CSS color value)
- `leftIcon` / `rightIcon` - React nodes for icons
- `rounded` - Border radius: `default`, `sm`, `md`, `lg`, `none`

### Input

Sizes: `sm`, `default`, `lg`

```tsx
import { Input } from '@design-system/components';

<Input placeholder="Enter text..." />
<Input label="Email" type="email" helperText="We'll never share your email" />
<Input label="Password" type="password" error="Password must be at least 8 characters" />
<Input leftIcon={<MailIcon />} type="email" placeholder="Email address" />
```

Props:
- `label` - Input label
- `error` - Error message (displays in red)
- `helperText` - Helper text below input
- `leftIcon` / `rightIcon` - React nodes for icons
- `fullWidth` - Full width control (default: `true`)
- `size` - Size variant
- `containerClassName` - Additional class for container

Password inputs automatically include a visibility toggle.

### Card

Variants: `default`, `outlined`, `elevated`, `flat`

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@design-system/components';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>Content goes here</CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

<Card hoverable clickable onClick={handleClick}>
  <CardContent>Click anywhere</CardContent>
</Card>
```

Props:
- `hoverable` - Enable hover effects
- `clickable` - Make card clickable (adds keyboard support)
- `variant` - Visual variant
- `CardTitle.size` - `sm`, `default`, `lg`
- `CardContent.padding` - `none`, `sm`, `default`, `lg`
- `CardFooter.justify` - `start`, `center`, `end`, `between`

## Hooks

### Theme

```tsx
import { useTheme } from '@design-system/hooks';

function MyComponent() {
  const { theme, setTheme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>Current: {theme}</button>;
}
```

### Media Queries

```tsx
import { useIsMobile, useIsTablet, useIsDesktop } from '@design-system/hooks';

function ResponsiveComponent() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();
  // ...
}
```

### Storage

```tsx
import { useLocalStorage, useSessionStorage } from '@design-system/hooks';

function MyComponent() {
  const [value, setValue] = useLocalStorage('key', 'default');
  const [session, setSession] = useSessionStorage('session', null);
  // ...
}
```

### Debounce & Throttle

```tsx
import { useDebounce, useDebouncedCallback } from '@design-system/hooks';

function SearchComponent() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  
  useEffect(() => {
    // API call
  }, [debouncedSearch]);
}
```

Other hooks: `useClickOutside`, `useToggle`, `useThrottledCallback`

## Utilities

### Class Name Utility

```tsx
import { cn } from '@design-system/utils';

const className = cn('base-class', condition && 'conditional-class');
```

### Type Guards

```tsx
import { isString, isNumber, isObject, isArray, isDefined } from '@design-system/utils';

if (isString(value)) {
  // TypeScript narrows to string
}
```

### Array Utilities

```tsx
import { unique, groupBy, chunk, flatten } from '@design-system/utils';

unique([1, 2, 2, 3]); // [1, 2, 3]
groupBy(items, 'category');
chunk(array, 3);
```

### Object Utilities

```tsx
import { omit, pick, deepMerge } from '@design-system/utils';

omit(obj, 'id');
pick(obj, 'name');
deepMerge(obj1, obj2);
```

### String Utilities

```tsx
import { capitalize, kebabCase, camelCase } from '@design-system/utils';

capitalize('hello'); // 'Hello'
kebabCase('helloWorld'); // 'hello-world'
```

## Customization

### CSS Variables

Override CSS variables in your global CSS:

```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --radius: 0.5rem;
}
```

### Tailwind Config

Extend the preset:

```js
module.exports = {
  presets: [require('@design-system/design-system/tailwind-preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
      },
    },
  },
};
```

### Theme Provider

Runtime theme switching:

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
  <YourApp />
</ThemeProvider>
```

### Component-Level

Use the `classNames` prop:

```tsx
<Button classNames={{ root: 'custom-button-class' }}>
  Custom Styled
</Button>
```

## Development

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Setup

```bash
git clone <repository-url>
cd design-system
pnpm install
pnpm dev
```

### Scripts

```bash
pnpm dev              # Start Storybook (http://localhost:6006)
pnpm build            # Build all packages
pnpm build:watch      # Build in watch mode
pnpm lint             # Lint all packages
pnpm type-check       # Type check all packages
pnpm clean            # Remove build artifacts and node_modules
```

### Run the platform shell with Claims (Module Federation)

The shell loads the Claims app as a **remote**. The federation plugin does **not** serve `remoteEntry.js` in dev, so the remote must be **built and served with preview**:

1. **Terminal 1 – build and serve Claims** (port 5002):
   ```bash
   pnpm --filter claims build && pnpm --filter claims preview
   ```
2. **Terminal 2 – run the shell** (port 5173):
   ```bash
   pnpm --filter platform-shell dev
   ```
3. Open **http://localhost:5173** and go to **Claims**. The favicon 404 is resolved by the shell’s inline favicon.

To develop the Claims app alone (no shell), run `pnpm --filter claims dev` and open http://localhost:5002.

### Project Structure

```
design-system/
├── packages/
│   ├── core/              # Design tokens, theme, Tailwind preset
│   ├── components/        # React components
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   └── design-system/     # Main package (re-exports)
├── apps/
│   └── storybook/         # Storybook documentation
└── package.json
```

### Adding Components

1. Create component in `packages/components/src/components/[component-name]/`
2. Export from `packages/components/src/index.ts`
3. Create Storybook story in `apps/storybook/src/components/[component-name]/`

## TypeScript

All packages are fully typed:

```tsx
import type { ButtonProps, InputProps, BadgeProps } from '@design-system/components';

const buttonProps: ButtonProps = {
  variant: 'default',
  size: 'lg',
  loading: false,
};
```

## Advanced Usage

### Generic Components

Components support the `asChild` prop for composition:

```tsx
<Button asChild>
  <a href="/link">Link Button</a>
</Button>
```

### Composition

Components are composable:

```tsx
<Card hoverable>
  <CardHeader>
    <CardTitle size="lg">Title</CardTitle>
  </CardHeader>
  <CardContent padding="lg">
    <Input label="Email" />
    <Button fullWidth>Submit</Button>
  </CardContent>
</Card>
```

### Custom Styling

Use Tailwind classes or CSS variables:

```tsx
<Button className="custom-class">Custom Button</Button>

<div style={{ '--primary': '222.2 47.4% 11.2%' }}>
  <Button>Themed Button</Button>
</div>
```

## Documentation

Run Storybook for interactive documentation:

```bash
pnpm dev
```

Open http://localhost:6006

Each package has its own README:
- `packages/core/README.md` - Design tokens and theme system
- `packages/components/README.md` - Component API reference
- `packages/hooks/README.md` - Hooks documentation
- `packages/utils/README.md` - Utilities documentation

## Publishing

This is a pnpm workspace monorepo. Each package can be versioned independently.

```bash
pnpm build
cd packages/components
npm publish
```

## Contributing

Contributions are welcome. Please read our [Contributing Guide](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) first.

## Versioning

This project follows [Semantic Versioning](https://semver.org/). See [VERSIONING.md](VERSIONING.md) for detailed guidelines.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes in each version.

## License

MIT
