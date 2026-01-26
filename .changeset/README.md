# Changesets

This directory contains changeset files that describe changes made to packages.

## Creating a Changeset

When you make changes that should be included in a release, create a changeset:

```bash
pnpm changeset
```

This will:
1. Ask which packages changed
2. Ask what type of change (major, minor, patch)
3. Ask for a description of the change
4. Create a markdown file in `.changeset/`

## Changeset File Format

Changeset files are markdown files with frontmatter:

```markdown
---
"@design-system/components": patch
---

Fix Button loading state not disabling the button
```

## What Happens Next

1. When you open a PR, the CI will check that a changeset exists
2. When merged to main, the release workflow will:
   - Create a PR with version bumps and changelog updates
   - When that PR is merged, it will publish to npm

## Example Changeset

For a new feature in the components package:

```bash
pnpm changeset
# Select: @design-system/components
# Select: minor
# Description: Add Dialog component
```

This creates a file that will be used to:
- Bump the version (minor)
- Update CHANGELOG.md
- Create a release
