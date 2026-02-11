import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { Tenant } from './tenant.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UserRole } from '../user/user.entity';
import { TENANT_CONFIGS } from './tenant-config.data';

@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Get()
  list(): Promise<Tenant[]> {
    return this.tenantService.list();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<Tenant> {
    return this.tenantService.findById(id);
  }

  @Get('config/:tenantId')
  getConfig(@Param('tenantId') tenantId: string) {
    const config = TENANT_CONFIGS[tenantId] ?? TENANT_CONFIGS.default;
    if (!config) {
      throw new NotFoundException('Tenant config not found');
    }
    return config;
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.PLATFORM_ADMIN)
  create(@Body() body: Partial<Tenant>): Promise<Tenant> {
    return this.tenantService.create(body);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.PLATFORM_ADMIN)
  update(
    @Param('id') id: string,
    @Body() body: Partial<Tenant>,
  ): Promise<Tenant> {
    return this.tenantService.update(id, body);
  }
}
