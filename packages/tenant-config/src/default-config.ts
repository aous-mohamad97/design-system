import type { TenantConfig } from './types';

/**
 * Default tenant config when none is loaded (e.g. loading or fallback).
 */
export const DEFAULT_TENANT_CONFIG: TenantConfig = {
  tenantId: 'default',
  branding: {},
  policySearchColumns: [
    { id: 'policyNumber', label: 'Policy #', field: 'policyNumber', sortable: true },
    { id: 'status', label: 'Status', field: 'status', sortable: true },
    { id: 'effectiveDate', label: 'Effective', field: 'effectiveDate', sortable: true },
  ],
  quoteDetailCta: {
    label: 'Continue',
    action: 'bindQuote',
  },
  features: {},
};
