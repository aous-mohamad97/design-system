/**
 * Partial theme object compatible with createTheme() from @design-system/core.
 * Use createTheme(branding.theme) when passing to ThemeProvider.
 */
export type TenantTheme = Record<string, unknown>;

/**
 * Policy search table column definition (per-tenant).
 */
export interface PolicySearchColumn {
  id: string;
  label: string;
  field: string;
  width?: string | number;
  sortable?: boolean;
}

/**
 * Quote detail page CTA (per-tenant).
 */
export type QuoteDetailCtaAction = 'sendEmail' | 'bindQuote' | 'requestCallback' | string;

export interface QuoteDetailCta {
  label: string;
  action: QuoteDetailCtaAction;
}

/**
 * Tenant branding (logo, theme, fonts).
 */
export interface TenantBranding {
  /** Partial theme merged with defaults via createTheme() from @design-system/core */
  theme?: TenantTheme;
  /** URL to logo image (used in shell layout, e.g. AppHeader) */
  logoUrl?: string;
  /** Optional font URLs to load (e.g. Google Fonts or custom) */
  fontUrls?: string[];
}

/**
 * Per-tenant feature flags. Keys are feature ids (e.g. 'claimsExport', 'advancedReports');
 * value true = enabled for this tenant. Omitted or false = disabled.
 */
export type TenantFeatures = Record<string, boolean>;

/**
 * Full tenant configuration schema.
 */
export interface TenantConfig {
  tenantId: string;
  branding: TenantBranding;
  /** Columns for policy search table (Client A: "additional driver", Client B: "line of business", etc.) */
  policySearchColumns: PolicySearchColumn[];
  /** Quote detail page primary CTA (Client A: Send Email, Client B: Bind Quote, etc.) */
  quoteDetailCta: QuoteDetailCta;
  /** Optional feature flags per tenant (e.g. claimsExport, advancedReports). */
  features?: TenantFeatures;
}
