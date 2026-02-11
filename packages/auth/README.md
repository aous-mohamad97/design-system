# @design-system/auth

Shared authentication client for design-system React apps.

Provides:

- Auth context and hooks for login/logout/refresh
- Token storage helpers
- Typed API client for the NestJS auth backend
- React Query integration helpers
- Protected/public route wrappers for React Router

## Installation

```bash
pnpm add @design-system/auth
```

Peer dependencies:

- `react`, `react-dom`
- `@tanstack/react-query`
- `react-router-dom`

## Basic usage

```tsx
import { AuthProvider } from '@design-system/auth';
import { QueryClientProvider } from '@tanstack/react-query';
import { createAuthedQueryClient } from '@design-system/auth';

const queryClient = createAuthedQueryClient();

function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider baseUrl="http://localhost:3000">
        <App />
      </AuthProvider>
    </QueryClientProvider>
  );
}
```

### Login form example

```tsx
import { useState } from 'react';
import { useAuth } from '@design-system/auth';
import { Button, Input } from '@design-system/design-system';

export function LoginPage() {
  const { login, status } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tenantKey, setTenantKey] = useState('default');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password, tenantKey });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        value={tenantKey}
        onChange={(e) => setTenantKey(e.target.value)}
      />
      <Button type="submit" disabled={status === 'loading'}>
        Login
      </Button>
    </form>
  );
}
```

### Protected routes

```tsx
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute, PublicOnlyRoute } from '@design-system/auth';

<Routes>
  <Route
    path="/login"
    element={
      <PublicOnlyRoute redirectTo="/app">
        <LoginPage />
      </PublicOnlyRoute>
    }
  />
  <Route
    path="/app/*"
    element={
      <ProtectedRoute redirectTo="/login">
        <AppLayout />
      </ProtectedRoute>
    }
  />
</Routes>;
```

