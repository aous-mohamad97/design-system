## Development

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Setup

```bash
git clone <repository-url>
cd design-system
pnpm install
pnpm --filter claims build
pnpm --filter claims preview # this will run on http://localhost:5002
pnpm --filter platform-shell dev # this will run on http://localhost:5173 (Main application)
```