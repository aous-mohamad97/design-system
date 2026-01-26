# GitHub and npm Setup Guide

## Prerequisites

1. GitHub repository created
2. npm account created
3. npm organization (if publishing scoped packages like `@design-system/*`)

## Step 1: Install Changesets

```bash
pnpm install
```

This will install `@changesets/cli` which was added to `package.json`.

## Step 2: GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add the following secrets:

**NPM_TOKEN**:
1. Go to [npmjs.com](https://www.npmjs.com) → Access Tokens → Generate New Token
2. Select "Automation" type (for CI/CD)
3. Copy the token
4. In GitHub: New repository secret → Name: `NPM_TOKEN`, Value: (paste token)

**GH_TOKEN** (Optional but recommended for PR creation):
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name like "Design System CI"
4. Select scopes: `repo` (full control of private repositories)
5. Generate and copy the token
6. In GitHub: New repository secret → Name: `GH_TOKEN`, Value: (paste token)

**Note**: If you don't set `GH_TOKEN`, the workflow will use `GITHUB_TOKEN` (automatically provided by GitHub Actions). However, `GITHUB_TOKEN` may not have permission to create pull requests depending on your repository settings. If you encounter PR creation errors, use `GH_TOKEN` instead.

## Step 3: npm Package Configuration

For each package in `packages/*/package.json`, ensure:

1. `name` is set correctly (e.g., `@design-system/components`)
2. `version` is set to `1.0.0`
3. If using scoped packages, add `publishConfig`:

```json
{
  "publishConfig": {
    "access": "public"
  }
}
```

Let me check if this is needed in your packages.

## Step 4: First Release Workflow

1. Create a changeset for the initial release:
   ```bash
   pnpm changeset
   ```
   - Select all packages that should be released
   - Choose `minor` for first release (1.0.0)
   - Add description: "Initial release"

2. Commit and push:
   ```bash
   git add .
   git commit -m "chore: add changeset for v1.0.0"
   git push origin main
   ```

3. The release workflow will:
   - Create a PR titled "chore: version packages" with version bumps
   - Merge that PR to trigger automatic publishing to npm

## Workflow Overview

1. **Developer makes changes** → Creates changeset → Opens PR
2. **CI runs** → Lints, type-checks, builds, checks for changeset
3. **PR merged to main** → Release workflow runs
4. **Release workflow** → Creates version PR if changesets exist
5. **Version PR merged** → Publishes to npm automatically

## Manual Publishing (if needed)

If you need to publish manually:

```bash
pnpm build
pnpm changeset version
pnpm changeset publish
```

Then manually publish each package:
```bash
cd packages/components && npm publish --access public
cd ../core && npm publish --access public
cd ../hooks && npm publish --access public
cd ../utils && npm publish --access public
cd ../design-system && npm publish --access public
```

## Troubleshooting

### Changeset check fails in PR
- Make sure you've created a changeset file in `.changeset/` directory
- Run `pnpm changeset` before opening PR

### Publishing fails
- Check that `NPM_TOKEN` secret is set correctly
- Verify package names don't conflict with existing npm packages
- Ensure you're logged in to npm: `npm whoami`

### Version PR not created
- Check that changesets exist in `.changeset/` directory
- Verify GitHub Actions workflow has proper permissions
- Check workflow logs in GitHub Actions tab

### GitHub Actions cannot create pull requests
If you see the error "GitHub Actions is not permitted to create or approve pull requests":

1. **Option 1: Use a Personal Access Token (PAT)**
   - Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Generate a new token with `repo` scope
   - Add it as a secret named `GH_TOKEN` in your repository
   - Update the workflow to use `GH_TOKEN` instead of `GITHUB_TOKEN`:
     ```yaml
     env:
       GITHUB_TOKEN: ${{ secrets.GH_TOKEN }}
     ```

2. **Option 2: Enable GitHub Actions in repository settings**
   - Go to repository Settings → Actions → General
   - Under "Workflow permissions", select "Read and write permissions"
   - Check "Allow GitHub Actions to create and approve pull requests"
   - Save changes

3. **Option 3: Use a bot account**
   - Create a GitHub account for your bot
   - Add it as a collaborator with write access
   - Use that account's PAT instead
