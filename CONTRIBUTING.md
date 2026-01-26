# Contributing

Contributions are welcome. This document outlines the process and standards for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/design-system.git`
3. Install dependencies: `pnpm install`
4. Create a branch: `git checkout -b feature/your-feature-name`

## Development Workflow

### Setup

```bash
pnpm install
pnpm dev  # Start Storybook
```

### Making Changes

1. Make your changes in the appropriate package
2. Add or update Storybook stories for component changes
3. Ensure tests pass (if applicable)
4. Run linting: `pnpm lint`
5. Run type checking: `pnpm type-check`

### Code Standards

- **TypeScript**: All code must be properly typed
- **Formatting**: Code is automatically formatted with Prettier
- **Linting**: Follow ESLint rules (run `pnpm lint` before committing)
- **Components**: Follow existing component patterns and structure
- **Documentation**: Update README files if adding new features

### Component Guidelines

- Use `cva` (class-variance-authority) for variant management
- Export types from `*.types.ts` files
- Include proper TypeScript types
- Support `className` and `classNames` props for customization
- Add Storybook stories demonstrating all variants and use cases
- Ensure accessibility (ARIA attributes, keyboard navigation)

### Commit Messages

Use clear, descriptive commit messages:

```
feat: add Dialog component
fix: correct Button loading state
docs: update README with new component
refactor: simplify Input component logic
```

Prefix with: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`

### Pull Requests

1. Update CHANGELOG.md with your changes
2. Ensure all checks pass (lint, type-check, build)
3. Add a clear description of what changed and why
4. Reference any related issues
5. Request review from maintainers

### Package Structure

```
packages/
  components/
    src/
      components/
        [component-name]/
          [component-name].tsx
          [component-name].types.ts
          index.ts
```

### Adding New Components

1. Create component directory in `packages/components/src/components/`
2. Implement component with TypeScript types
3. Export from `packages/components/src/index.ts`
4. Create Storybook story in `apps/storybook/src/components/`
5. Update `packages/components/README.md` if needed

### Adding New Hooks

1. Create hook file in `packages/hooks/src/`
2. Export from `packages/hooks/src/index.ts`
3. Add JSDoc comments
4. Update `packages/hooks/README.md`

## Versioning

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (0.1.0): New features, backward compatible
- **PATCH** (0.0.1): Bug fixes, backward compatible

See [VERSIONING.md](./VERSIONING.md) for detailed versioning guidelines.

## Questions?

Open an issue for questions or discussions about contributions.
