# Versioning Guide

This project follows [Semantic Versioning](https://semver.org/) (SemVer).

## Version Format

`MAJOR.MINOR.PATCH`

- **MAJOR**: Breaking changes that require code changes in consuming projects
- **MINOR**: New features that are backward compatible
- **PATCH**: Bug fixes that are backward compatible

## Versioning Rules

### MAJOR Version (1.0.0 → 2.0.0)

Bump when:
- Removing public APIs
- Changing component prop types in a breaking way
- Removing props or making required props optional (or vice versa)
- Changing default behavior that breaks existing usage
- Removing exports from packages

Examples:
- Removing a component prop
- Changing a prop type from `string` to `'option1' | 'option2'`
- Removing a component variant
- Changing default component behavior

### MINOR Version (1.0.0 → 1.1.0)

Bump when:
- Adding new components
- Adding new props (optional)
- Adding new variants or sizes
- Adding new hooks or utilities
- Adding new exports
- Enhancing existing features without breaking changes

Examples:
- Adding a new `Dialog` component
- Adding optional `icon` prop to Button
- Adding new `xl` size variant
- Adding new `useWindowSize` hook

### PATCH Version (1.0.0 → 1.0.1)

Bump when:
- Fixing bugs
- Fixing TypeScript types (non-breaking)
- Improving documentation
- Performance improvements
- Internal refactoring (no API changes)

Examples:
- Fixing Button loading state bug
- Correcting TypeScript type definitions
- Fixing accessibility issues
- Performance optimizations

## Monorepo Versioning

This is a monorepo with multiple packages. Each package can be versioned independently, but typically:

- All packages share the same version for simplicity
- When one package has a breaking change, all packages bump MAJOR
- When adding features, bump MINOR across all packages
- Bug fixes can be patched individually if isolated

## Version Update Process

1. Update version in `package.json` files:
   - Root `package.json` (if needed)
   - All package `package.json` files in `packages/*/package.json`

2. Update `CHANGELOG.md`:
   - Add new version section
   - Document all changes (Added, Changed, Deprecated, Removed, Fixed, Security)

3. Create git tag:
   ```bash
   git tag -a v1.0.0 -m "Release version 1.0.0"
   git push origin v1.0.0
   ```

4. Publish packages:
   ```bash
   pnpm build
   cd packages/components && npm publish
   cd ../core && npm publish
   # ... etc
   ```

## Pre-release Versions

For pre-release versions, use:
- `1.0.0-alpha.1` - Alpha releases
- `1.0.0-beta.1` - Beta releases
- `1.0.0-rc.1` - Release candidates

## Examples

### Breaking Change Example

**Before:**
```tsx
<Button variant="primary" />
```

**After:**
```tsx
<Button variant="default" />  // 'primary' removed
```

This requires a **MAJOR** version bump (1.0.0 → 2.0.0)

### New Feature Example

**Before:**
```tsx
<Button>Click</Button>
```

**After:**
```tsx
<Button loading>Click</Button>  // New optional prop
```

This requires a **MINOR** version bump (1.0.0 → 1.1.0)

### Bug Fix Example

Fixing a bug where Button doesn't disable when `loading={true}`.

This requires a **PATCH** version bump (1.0.0 → 1.0.1)

## Automated Versioning

Consider using tools like:
- `changesets` - For managing versions and changelogs
- `semantic-release` - For automated versioning based on commits
- `lerna` - For monorepo version management

## Best Practices

1. **Always update CHANGELOG.md** when bumping versions
2. **Tag releases** in git for easy reference
3. **Communicate breaking changes** clearly in release notes
4. **Test thoroughly** before releasing new versions
5. **Keep versions in sync** across packages when possible
