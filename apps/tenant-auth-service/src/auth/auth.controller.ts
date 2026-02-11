import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import type { TokenPair } from './auth.service';
import { AuthService } from './auth.service';
import { UserRole } from '../user/user.entity';

interface LoginDto {
  email: string;
  password: string;
}

interface RefreshDto {
  refreshToken?: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // NOTE(dev-auth): Temporary, simplified auth flow for development.
  // TODO(auth): Restore real AuthService-based login with JWT + refresh tokens.
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body: LoginDto) {
    const user = {
      id: 'dev-user-id',
      email: body.email.toLowerCase(),
      tenantId: 'dev-tenant-id',
      roles: ['TENANT_ADMIN' as UserRole],
    };

    return {
      accessToken: 'dev-access-token',
      refreshToken: 'dev-refresh-token',
      user,
    };
  }

  // NOTE(dev-auth): Temporary refresh endpoint – always returns fixed dev tokens.
  // TODO(auth): Restore real refresh-token validation and rotation logic.
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(@Body() _body: RefreshDto): TokenPair {
    void _body; // TODO(auth): use body.refreshToken when real refresh flow is restored
    return {
      accessToken: 'dev-access-token',
      refreshToken: 'dev-refresh-token',
    };
  }

  // NOTE(dev-auth): Temporary logout – no-op besides 204 response.
  // TODO(auth): Restore real logout with refresh-token revocation and cookie clearing.
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  logout() {}

  // NOTE(dev-auth): Temporary /auth/me – trusts any Bearer token and returns a dev user.
  // TODO(auth): Restore guard-based /auth/me that validates real JWT access tokens.
  @Get('me')
  @HttpCode(HttpStatus.OK)
  me(@Req() req: Request) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing access token');
    }

    return {
      id: 'dev-user-id',
      email: 'dev@example.com',
      tenantId: 'dev-tenant-id',
      roles: ['TENANT_ADMIN' as UserRole],
    };
  }
}
