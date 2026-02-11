import type { TenantConfig } from '@design-system/types';

export const TENANT_CONFIGS: Record<string, TenantConfig> = {
  'customer-a': {
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
      logoUrl: undefined,
    },
    policySearchColumns: [
      {
        id: 'policyNumber',
        label: 'Policy #',
        field: 'policyNumber',
        sortable: true,
      },
      { id: 'status', label: 'Status', field: 'status', sortable: true },
      {
        id: 'additionalDriver',
        label: 'Additional driver',
        field: 'additionalDriver',
        sortable: true,
      },
      {
        id: 'effectiveDate',
        label: 'Effective',
        field: 'effectiveDate',
        sortable: true,
      },
    ],
    quoteDetailCta: {
      label: 'Send Email',
      action: 'sendEmail',
    },
    features: {
      claimsExport: true,
      advancedReports: true,
    },
  },
  'customer-b': {
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
      {
        id: 'policyNumber',
        label: 'Policy #',
        field: 'policyNumber',
        sortable: true,
      },
      { id: 'status', label: 'Status', field: 'status', sortable: true },
      {
        id: 'lineOfBusiness',
        label: 'Line of business',
        field: 'lineOfBusiness',
        sortable: true,
      },
      {
        id: 'effectiveDate',
        label: 'Effective',
        field: 'effectiveDate',
        sortable: true,
      },
    ],
    quoteDetailCta: {
      label: 'Bind Quote',
      action: 'bindQuote',
    },
    features: {
      claimsExport: false,
      advancedReports: true,
    },
  },
  default: {
    tenantId: 'default',
    branding: {
      theme: {},
    },
    policySearchColumns: [],
    quoteDetailCta: {
      label: '',
      action: '',
    },
    features: {},
  },
};

