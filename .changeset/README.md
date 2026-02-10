# Changesets

This directory contains changeset files that describe changes made to packages in the monorepo.

## Creating a changeset

When you make changes that should be included in a release, create a changeset from the repo root:

```bash
pnpm changeset
```

This will:

1. Ask which packages changed.
2. Ask what type of change (major, minor, patch).
3. Ask for a description of the change.
4. Create a markdown file in `.changeset/`.

## Changeset file format

Changeset files are markdown files with frontmatter:

```markdown
---
"@design-system/components": patch
---

Fix Button loading state not disabling the button
```

## Versioning and releasing

After one or more changesets have been added, bump versions and update changelogs:

```bash
pnpm version-packages
```

This will:

- Update package versions based on the collected changesets.
- Update `CHANGELOG.md` files.
- Mark the changesets as consumed.

Publishing to npm is typically handled by CI after the version-bump PR is merged.

## Example changeset

For a new feature in the components package:

```bash
pnpm changeset
# Select: @design-system/components
# Select: minor
# Description: Add Dialog component
```

This creates a file that will be used to:

- Bump the version (minor).
- Update `CHANGELOG.md`.
- Create a release.
