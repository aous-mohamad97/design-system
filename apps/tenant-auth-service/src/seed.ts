import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TenantService } from './tenant/tenant.service';
import { UserService } from './user/user.service';
import { UserRole } from './user/user.entity';

async function bootstrapSeed() {
  const appContext = await NestFactory.createApplicationContext(AppModule);

  try {
    const tenantService = appContext.get(TenantService);
    const userService = appContext.get(UserService);

    // Seed default tenant
    const tenantKey = process.env.SEED_TENANT_KEY ?? 'default';
    const tenantName = process.env.SEED_TENANT_NAME ?? 'Default Tenant';

    let tenant = await tenantService.findByKey(tenantKey).catch(() => null);

    if (!tenant) {
      tenant = await tenantService.create({
        key: tenantKey,
        name: tenantName,
        isActive: true,
      });
      console.log(`Created tenant ${tenantKey} (${tenant.id})`);
    } else {
      console.log(`Tenant ${tenantKey} already exists (${tenant.id})`);
    }

    // Seed admin user for that tenant
    const adminEmail = process.env.SEED_ADMIN_EMAIL ?? 'admin@example.com';
    const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? 'ChangeMe123!';

    const existingAdmin = await userService.findByEmailAndTenant(
      adminEmail,
      tenant.id,
    );

    if (!existingAdmin) {
      const admin = await userService.createUser({
        email: adminEmail,
        password: adminPassword,
        tenantId: tenant.id,
        roles: [UserRole.TENANT_ADMIN],
      });
      console.log(`Created admin user ${admin.email} for tenant ${tenantKey}`);
    } else {
      console.log(
        `Admin user ${adminEmail} already exists for tenant ${tenantKey}`,
      );
    }

    // Seed demo tenants (customer-a, customer-b)
    const demoTenants: Array<{
      key: string;
      name: string;
      adminEmailEnv: string;
      adminPasswordEnv: string;
      defaultEmail: string;
    }> = [
      {
        key: 'customer-a',
        name: 'Customer A',
        adminEmailEnv: 'SEED_CUSTOMER_A_ADMIN_EMAIL',
        adminPasswordEnv: 'SEED_CUSTOMER_A_ADMIN_PASSWORD',
        defaultEmail: 'customer-a-admin@example.com',
      },
      {
        key: 'customer-b',
        name: 'Customer B',
        adminEmailEnv: 'SEED_CUSTOMER_B_ADMIN_EMAIL',
        adminPasswordEnv: 'SEED_CUSTOMER_B_ADMIN_PASSWORD',
        defaultEmail: 'customer-b-admin@example.com',
      },
    ];

    for (const demo of demoTenants) {
      let demoTenant = await tenantService
        .findByKey(demo.key)
        .catch(() => null);

      if (!demoTenant) {
        demoTenant = await tenantService.create({
          key: demo.key,
          name: demo.name,
          isActive: true,
        });
        console.log(`Created tenant ${demo.key} (${demoTenant.id})`);
      } else {
        console.log(`Tenant ${demo.key} already exists (${demoTenant.id})`);
      }

      const demoAdminEmail =
        process.env[demo.adminEmailEnv] ?? demo.defaultEmail;
      const demoAdminPassword =
        process.env[demo.adminPasswordEnv] ?? 'ChangeMe123!';

      const existingDemoAdmin = await userService.findByEmailAndTenant(
        demoAdminEmail,
        demoTenant.id,
      );

      if (!existingDemoAdmin) {
        const admin = await userService.createUser({
          email: demoAdminEmail,
          password: demoAdminPassword,
          tenantId: demoTenant.id,
          roles: [UserRole.TENANT_ADMIN],
        });
        console.log(`Created admin user ${admin.email} for tenant ${demo.key}`);
      } else {
        console.log(
          `Admin user ${demoAdminEmail} already exists for tenant ${demo.key}`,
        );
      }
    }
  } finally {
    await appContext.close();
  }
}

void bootstrapSeed().catch((error) => {
  console.error('Seed failed', error);
  process.exit(1);
});
