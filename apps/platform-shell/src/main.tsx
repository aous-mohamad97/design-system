import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { TenantProvider, useTenant, MOCK_TENANT_CONFIG_MAP } from '@design-system/tenant-config';
import { createTheme, ThemeProvider } from '@design-system/design-system';
import App from './App';
import './styles.css';

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
      <BrowserRouter>
        <TenantProvider mockConfigMap={MOCK_TENANT_CONFIG_MAP}>
          <AppWithTheme />
        </TenantProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}
