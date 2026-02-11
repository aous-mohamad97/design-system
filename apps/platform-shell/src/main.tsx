import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { createAuthedQueryClient, AuthProvider } from '@design-system/auth';
import { TenantProvider, useTenant } from '@design-system/tenant-config';
import { createTheme, ThemeProvider } from '@design-system/design-system';
import App from './App';
import './styles.css';

const queryClient = createAuthedQueryClient();
const API_BASE_URL =
  import.meta.env.VITE_AUTH_BASE_URL ?? 'http://localhost:3000';

function AppWithTheme() {
  const { config, isLoading } = useTenant();
  const theme = createTheme((config?.branding?.theme as object) ?? {});

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center font-sans">
        Loading...
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
}

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TenantProvider backendBaseUrl={API_BASE_URL}>
            <AuthProvider baseUrl={API_BASE_URL}>
              <AppWithTheme />
            </AuthProvider>
          </TenantProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  );
}
