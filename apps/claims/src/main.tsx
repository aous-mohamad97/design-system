import React from 'react';
import ReactDOM from 'react-dom/client';
import { TenantProvider, MOCK_TENANT_CONFIG_MAP } from '@design-system/tenant-config';
import ClaimsApp from './ClaimsApp';
import './styles.css';

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <TenantProvider mockConfigMap={MOCK_TENANT_CONFIG_MAP}>
        <ClaimsApp />
      </TenantProvider>
    </React.StrictMode>
  );
}
