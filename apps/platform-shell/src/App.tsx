import React, { lazy, Suspense, useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { useTenant } from '@design-system/tenant-config';
import type { TenantConfig } from '@design-system/types';
import { ProtectedRoute, PublicOnlyRoute, useAuth } from '@design-system/auth';
import { Button, Input, Card } from '@design-system/design-system';

const ClaimsAppLazy = lazy(() => import('claims/ClaimsApp'));

type ClaimsAppProps = { config: TenantConfig; tenantId: string };

function ClaimsRoute() {
  const { config, tenantId } = useTenant();
  return React.createElement(ClaimsAppLazy as React.ComponentType<ClaimsAppProps>, { config, tenantId });
}

function Layout({ children }: { children: React.ReactNode }) {
  const { config } = useTenant();
  const { user, logout } = useAuth();
  const logoUrl = config.branding?.logoUrl;

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'}`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border bg-background">
        <div className="flex h-14 items-center gap-6 px-4 justify-between">
          <div className="flex items-center gap-6">
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="h-8 w-auto" />
            ) : (
              <span className="text-lg font-semibold font-heading">Insurance Platform</span>
            )}
            <nav className="flex gap-1">
              <NavLink to="/" end className={navClass}>
                Home
              </NavLink>
              <NavLink to="/claims" className={navClass}>
                Claims
              </NavLink>
            </nav>
          </div>
          <div className="flex items-center gap-3 text-sm">
            {user ? (
              <>
                <span className="text-foreground-secondary">{user.email}</span>
                <Button variant="outline" size="sm" onClick={() => logout()}>
                  Logout
                </Button>
              </>
            ) : (
              <NavLink to="/login" className={navClass}>
                Login
              </NavLink>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}

function Home() {
  return (
    <div className="font-sans">
      <h1 className="text-2xl font-heading font-semibold mb-2">Welcome</h1>
      <p className="text-foreground-secondary">Select a module from the navigation.</p>
    </div>
  );
}

function LoginPage() {
  const { login, status } = useAuth();
  const { tenantId } = useTenant();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login({
        email,
        password,
        tenantKey: tenantId ?? 'default',
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Unable to login. Please try again.';
      setError(message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <Card className="p-6 space-y-4">
        <h1 className="text-xl font-heading font-semibold">Login</h1>
        <form className="space-y-3" onSubmit={handleSubmit}>
          {error ? (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}
          <div className="space-y-1">
            <label className="text-sm font-medium">Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={status === 'loading'}>
            {status === 'loading' ? 'Signing in...' : 'Login'}
          </Button>
        </form>
      </Card>
    </div>
  );
}

function RemoteFallback() {
  return (
    <div className="flex items-center justify-center p-8 text-foreground-secondary">
      Loading module...
    </div>
  );
}

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<RemoteFallback />}>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicOnlyRoute redirectTo="/claims">
                <LoginPage />
              </PublicOnlyRoute>
            }
          />
          <Route path="/" element={<Home />} />
          <Route
            path="/claims/*"
            element={
              <ProtectedRoute redirectTo="/login">
                <ClaimsRoute />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </Layout>
  );
}
