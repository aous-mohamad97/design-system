import React from 'react';
import { useTenantOptional, DEFAULT_TENANT_CONFIG } from '@design-system/tenant-config';
import type { TenantConfig } from '@design-system/tenant-config';

export interface ClaimsAppProps {
  /** When provided (e.g. by host shell), tenant config is passed as props so the remote does not need TenantProvider context. */
  config?: TenantConfig;
  tenantId?: string;
}

/** Pure UI – no context. Used when host passes config or when used with resolved values. */
function ClaimsAppContent({
  tenantId,
}: {
  config: TenantConfig;
  tenantId: string;
}) {
  return (
    <div>
      <h1 className="text-2xl font-heading font-semibold">Claims</h1>
      <p className="text-foreground-secondary">Tenant: {tenantId}</p>
    </div>
  );
}

/**
 * When config/tenantId are passed (e.g. from host), use them and do not use context.
 * When not passed (standalone), use context via useTenantOptional.
 */
export default function ClaimsApp(props?: ClaimsAppProps) {
  if (props?.config != null) {
    const tenantId = props.tenantId ?? props.config.tenantId;
    return <ClaimsAppContent config={props.config} tenantId={tenantId} />;
  }
  return <ClaimsAppWithContext />;
}

function ClaimsAppWithContext() {
  const fromContext = useTenantOptional();
  const config = fromContext?.config ?? DEFAULT_TENANT_CONFIG;
  const tenantId = fromContext?.tenantId ?? config.tenantId;
  return <ClaimsAppContent config={config} tenantId={tenantId} />;
}
