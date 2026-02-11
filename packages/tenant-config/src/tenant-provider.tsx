import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { TenantConfig } from './types';
import { DEFAULT_TENANT_CONFIG } from './default-config';

export interface TenantContextValue {
  config: TenantConfig;
  tenantId: string;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

const TenantContext = createContext<TenantContextValue | null>(null);

export interface TenantProviderProps {
  children: React.ReactNode;
  /** Override tenant id (default: resolve from subdomain or first path segment) */
  tenantId?: string;
  /** Static config for this tenant. When set, used as-is (no lookup). */
  initialConfig?: TenantConfig | null;
  /**
   * Static config map: tenant id -> config. Config is resolved by tenant id
   * (e.g. customer-a, customer-b, default). Use with resolveTenantId() for path/subdomain-based lookup.
   */
  mockConfigMap?: Record<string, TenantConfig>;
  /**
   * Optional backend base URL. When provided, TenantProvider will attempt to
   * load tenant config from `${backendBaseUrl}/tenants/config/:tenantId`
   * and fall back to static config (initialConfig/mockConfigMap/default) on error.
   */
  backendBaseUrl?: string;
}

/**
 * Resolve tenant id from subdomain or first path segment (e.g. /customer-a -> customer-a).
 * Used to look up config from mockConfigMap when no initialConfig is provided.
 */
export function resolveTenantId(): string {
  if (typeof window === 'undefined') return 'default';
  const hostname = window.location.hostname;
  const parts = hostname.split('.');
  if (parts.length >= 2 && parts[0] !== 'www') return parts[0];
  const pathMatch = window.location.pathname.match(/^\/([^/]+)/);
  if (pathMatch) return pathMatch[1];
  return 'default';
}

function loadFontUrls(urls: string[]): void {
  if (typeof document === 'undefined') return;
  urls.forEach((href) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  });
}

function getConfigFromMock(mockConfigMap: Record<string, TenantConfig>, tenantId: string): TenantConfig {
  return mockConfigMap[tenantId] ?? mockConfigMap['default'] ?? DEFAULT_TENANT_CONFIG;
}

/**
 * Tenant configuration provider. Uses static config only (initialConfig or mockConfigMap).
 * Place above ThemeProvider in the shell; use config.branding.theme with createTheme() for ThemeProvider.
 */
export function TenantProvider({
  children,
  tenantId: tenantIdProp,
  initialConfig,
  mockConfigMap,
  backendBaseUrl,
}: TenantProviderProps) {
  const tenantId = tenantIdProp ?? resolveTenantId();

  const resolvedInitial = useMemo(() => {
    if (initialConfig) return initialConfig;
    if (mockConfigMap) return getConfigFromMock(mockConfigMap, tenantId);
    return DEFAULT_TENANT_CONFIG;
  }, [initialConfig, mockConfigMap, tenantId]);

  const [config, setConfig] = useState<TenantConfig>(resolvedInitial);
  const [isLoading, setIsLoading] = useState<boolean>(!!backendBaseUrl);
  const [error, setError] = useState<Error | null>(null);

  const loadConfig = useCallback(async () => {
    // Prefer backend when configured
    if (backendBaseUrl) {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${backendBaseUrl.replace(/\/+$/, '')}/tenants/config/${tenantId}`,
        );
        if (!res.ok) {
          throw new Error('Failed to load tenant config from backend');
        }
        const next = (await res.json()) as TenantConfig;
        setConfig(next);
        if (next.branding?.fontUrls?.length) {
          loadFontUrls(next.branding.fontUrls);
        }
      } catch (err) {
        setError(err as Error);
        // fallback to static
        if (initialConfig) {
          setConfig(initialConfig);
        } else if (mockConfigMap) {
          const next = getConfigFromMock(mockConfigMap, tenantId);
          setConfig(next);
          if (next.branding?.fontUrls?.length) {
            loadFontUrls(next.branding.fontUrls);
          }
        } else {
          setConfig(DEFAULT_TENANT_CONFIG);
        }
      } finally {
        setIsLoading(false);
      }
      return;
    }

    if (initialConfig) {
      setConfig(initialConfig);
      return;
    }
    if (mockConfigMap) {
      const next = getConfigFromMock(mockConfigMap, tenantId);
      setConfig(next);
      if (next.branding?.fontUrls?.length) loadFontUrls(next.branding.fontUrls);
    } else {
      setConfig(DEFAULT_TENANT_CONFIG);
    }
  }, [tenantId, initialConfig, mockConfigMap, backendBaseUrl]);

  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  const value = useMemo<TenantContextValue>(
    () => ({
      config,
      tenantId,
      isLoading,
      error,
      refetch: loadConfig,
    }),
    [config, tenantId, loadConfig]
  );

  return <TenantContext.Provider value={value}>{children}</TenantContext.Provider>;
}

export function useTenant(): TenantContextValue {
  const ctx = useContext(TenantContext);
  if (!ctx) throw new Error('useTenant must be used within TenantProvider');
  return ctx;
}

export function useTenantOptional(): TenantContextValue | null {
  return useContext(TenantContext);
}
