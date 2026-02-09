import type { TenantConfig } from './types';
import { DEFAULT_TENANT_CONFIG } from './default-config';

/**
 * Mock config for Customer A (e.g. "additional driver" column, Send Email CTA).
 * Use when no backend tenant config API is available.
 */
export const MOCK_CONFIG_CUSTOMER_A: TenantConfig = {
  tenantId: 'customer-a',
  branding: {
    theme: {
      colors: {
        primary: {
          500: '#2563eb',
          600: '#1d4ed8',
        },
      },
    },
    logoUrl: undefined, // set to a URL to test logo
  },
  policySearchColumns: [
    { id: 'policyNumber', label: 'Policy #', field: 'policyNumber', sortable: true },
    { id: 'status', label: 'Status', field: 'status', sortable: true },
    { id: 'additionalDriver', label: 'Additional driver', field: 'additionalDriver', sortable: true },
    { id: 'effectiveDate', label: 'Effective', field: 'effectiveDate', sortable: true },
  ],
  quoteDetailCta: {
    label: 'Send Email',
    action: 'sendEmail',
  },
  features: {
    claimsExport: true,
    advancedReports: true,
  },
};

/**
 * Mock config for Customer B (e.g. "line of business" column, Bind Quote CTA).
 */
export const MOCK_CONFIG_CUSTOMER_B: TenantConfig = {
  tenantId: 'customer-b',
  branding: {
    theme: {
      colors: {
        primary: {
          500: '#059669',
          600: '#047857',
        },
      },
    },
  },
  policySearchColumns: [
    { id: 'policyNumber', label: 'Policy #', field: 'policyNumber', sortable: true },
    { id: 'status', label: 'Status', field: 'status', sortable: true },
    { id: 'lineOfBusiness', label: 'Line of business', field: 'lineOfBusiness', sortable: true },
    { id: 'effectiveDate', label: 'Effective', field: 'effectiveDate', sortable: true },
  ],
  quoteDetailCta: {
    label: 'Bind Quote',
    action: 'bindQuote',
  },
  features: {
    claimsExport: false,
    advancedReports: true,
  },
};

/**
 * Map of tenant id -> mock config. Use with TenantProvider mockConfigMap prop to run without a backend.
 */
export const MOCK_TENANT_CONFIG_MAP: Record<string, TenantConfig> = {
  'customer-a': MOCK_CONFIG_CUSTOMER_A,
  'customer-b': MOCK_CONFIG_CUSTOMER_B,
  default: DEFAULT_TENANT_CONFIG,
};

/**
 * Get mock config for a tenant id. Falls back to default if tenant not in map.
 * Use when you want a single config (e.g. initialConfig) from mock data.
 */
export function getMockConfig(tenantId: string = 'default'): TenantConfig {
  return MOCK_TENANT_CONFIG_MAP[tenantId] ?? DEFAULT_TENANT_CONFIG;
}
