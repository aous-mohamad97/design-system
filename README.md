## design-system

Multi-tenant React design system and micro-frontend demo built with pnpm workspaces, Vite, Tailwind CSS, and shadcn/ui.

This monorepo contains:

- Apps:
  - `claims` – module-federation **remote** that exposes the `ClaimsApp` micro-frontend.
  - `platform-shell` – host application that consumes the `claims` remote and wires routing, theming, and tenant configuration.
  - `storybook` – Storybook instance for developing and documenting UI components.
- Packages:
  - `@design-system/core` – tokens, theme system, Tailwind preset, CSS variables.
  - `@design-system/components` – shadcn-style React components.
  - `@design-system/hooks` – reusable React hooks.
  - `@design-system/utils` – utility helpers (class names, formatting, type guards, etc.).
  - `@design-system/design-system` – convenience package that re-exports everything above.
  - `@design-system/tenant-config` – multi-tenant configuration, context provider, and hooks.

## Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

## Getting started

```bash
git clone <repository-url>
cd design-system
pnpm install
```

### Run Storybook (component development)

```bash
pnpm dev           # runs Storybook on http://localhost:6006
```

### Run the platform shell (host app)

```bash
pnpm --filter platform-shell dev   # http://localhost:5173
```

### Run the claims app (remote)

```bash
pnpm --filter claims dev           # http://localhost:5002
```

You can also build and preview the remote:

```bash
pnpm --filter claims build
pnpm --filter claims preview
```

## Using the design system in an app

Most consumers should use the aggregated `@design-system/design-system` package:

```tsx
import {
  Button,
  Card,
  Input,
  ThemeProvider,
  useTheme,
} from '@design-system/design-system';
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

If you only need a subset (e.g. just utilities or hooks), you can depend on the individual workspace packages instead.

## Releasing packages

This repo uses [Changesets](https://github.com/changesets/changesets) for versioning and publishing.

```bash
pnpm changeset           # create a changeset for your changes
pnpm version-packages    # apply version bumps and update changelogs
```

Publishing to npm is typically handled by CI once changes are merged to the main branch.