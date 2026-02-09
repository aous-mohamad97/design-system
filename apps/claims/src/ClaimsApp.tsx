import React, { useState } from 'react';
import { useTenantOptional, DEFAULT_TENANT_CONFIG, MOCK_CONFIG_CUSTOMER_A, MOCK_CONFIG_CUSTOMER_B } from '@design-system/tenant-config';
import type { TenantConfig } from '@design-system/tenant-config';
import { Button } from '@design-system/design-system';

export interface ClaimsAppProps {
  /** When provided (e.g. by host shell), tenant config is passed as props so the remote does not need TenantProvider context. */
  config?: TenantConfig;
  tenantId?: string;
}

type FeaturesView = 'customer-a' | 'customer-b' | null;

/** Pure UI – no context. Used when host passes config or when used with resolved values. */
function ClaimsAppContent({
  tenantId,
}: {
  config: TenantConfig;
  tenantId: string;
}) {
  const [featuresView, setFeaturesView] = useState<FeaturesView>(null);

  const featuresA = MOCK_CONFIG_CUSTOMER_A.features ?? {};
  const featuresB = MOCK_CONFIG_CUSTOMER_B.features ?? {};

  return (
    <div className="font-sans space-y-6">
      <h1 className="text-2xl font-heading font-semibold">Claims</h1>
      <p className="text-foreground-secondary">Tenant: {tenantId}</p>

      <div className="flex flex-col gap-4">
        <p className="text-sm font-medium text-foreground-secondary">Show features by customer:</p>
        <div className="flex gap-2">
          <Button
            variant={featuresView === 'customer-a' ? 'default' : 'outline'}
            size="default"
            onClick={() => setFeaturesView((v) => (v === 'customer-a' ? null : 'customer-a'))}
          >
            Customer A features
          </Button>
          <Button
            variant={featuresView === 'customer-b' ? 'default' : 'outline'}
            size="default"
            onClick={() => setFeaturesView((v) => (v === 'customer-b' ? null : 'customer-b'))}
          >
            Customer B features
          </Button>
        </div>

        {featuresView === 'customer-a' && (
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <h2 className="text-lg font-semibold mb-2">Customer A features</h2>
            <ul className="list-disc list-inside space-y-1 text-sm text-foreground-secondary">
              {Object.entries(featuresA).map(([key, enabled]) => (
                <li key={key}>
                  <span className="font-medium text-foreground">{key}</span>: {enabled ? 'Enabled' : 'Disabled'}
                </li>
              ))}
              {Object.keys(featuresA).length === 0 && <li>No features defined</li>}
            </ul>
          </div>
        )}

        {featuresView === 'customer-b' && (
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <h2 className="text-lg font-semibold mb-2">Customer B features</h2>
            <ul className="list-disc list-inside space-y-1 text-sm text-foreground-secondary">
              {Object.entries(featuresB).map(([key, enabled]) => (
                <li key={key}>
                  <span className="font-medium text-foreground">{key}</span>: {enabled ? 'Enabled' : 'Disabled'}
                </li>
              ))}
              {Object.keys(featuresB).length === 0 && <li>No features defined</li>}
            </ul>
          </div>
        )}
      </div>
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
