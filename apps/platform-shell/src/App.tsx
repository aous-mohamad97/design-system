import React, { lazy, Suspense } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { useTenant } from '@design-system/tenant-config';
import type { TenantConfig } from '@design-system/tenant-config';

const ClaimsAppLazy = lazy(() => import('claims/ClaimsApp'));

type ClaimsAppProps = { config: TenantConfig; tenantId: string };

function ClaimsRoute() {
  const { config, tenantId } = useTenant();
  return React.createElement(ClaimsAppLazy as React.ComponentType<ClaimsAppProps>, { config, tenantId });
}

function Layout({ children }: { children: React.ReactNode }) {
  const { config } = useTenant();
  const logoUrl = config.branding?.logoUrl;

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'}`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border bg-background">
        <div className="flex h-14 items-center gap-6 px-4">
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
          <Route path="/" element={<Home />} />
          <Route path="/claims/*" element={<ClaimsRoute />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
