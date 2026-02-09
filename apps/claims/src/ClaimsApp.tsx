import React from 'react';
import { useTenant } from '@design-system/tenant-config';

export default function ClaimsApp() {
  const { config } = useTenant();
  console.log(config);
  return (
    <div>
      Claims
    </div>
  );
}
