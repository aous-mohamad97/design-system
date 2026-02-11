import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { UserService } from '../user/user.service';
import { TenantService } from '../tenant/tenant.service';
import { RefreshToken } from './refresh-token.entity';
import { User } from '../user/user.entity';
import type { AuthConfig } from '../config/auth.config';

interface LoginParams {
  email: string;
  password: string;
  tenantKey?: string;
  userAgent?: string;
  ipAddress?: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly tenantService: TenantService,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepo: Repository<RefreshToken>,
    private readonly configService: ConfigService,
  ) {}

  async login(params: LoginParams): Promise<{
    tokens: TokenPair;
    user: User;
  }> {
    let user: User | null = null;
    let tenantId: string;

    if (params.tenantKey) {
      const tenant = await this.tenantService.findByKey(params.tenantKey);
      tenantId = tenant.id;
      user = await this.userService.findByEmailAndTenant(
        params.email,
        tenant.id,
      );
    } else {
      // Resolve tenant from user record when tenantKey is not provided
      user = await this.userService.findByEmail(params.email);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      tenantId = user.tenantId;
    }
    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const valid = await this.userService.validatePassword(
      user,
      params.password,
    );
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.issueTokens(user);
    await this.persistRefreshToken({
      user,
      tenantId,
      refreshToken: tokens.refreshToken,
      userAgent: params.userAgent,
      ipAddress: params.ipAddress,
    });

    return { tokens, user };
  }

  async refresh(
    refreshToken: string,
    userAgent?: string,
    ipAddress?: string,
  ): Promise<TokenPair> {
    if (!refreshToken) {
      throw new BadRequestException('Missing refresh token');
    }

    const auth = this.configService.get<AuthConfig>('auth', { infer: true }) as
      | AuthConfig
      | undefined;

    const payload = this.jwtService.verify<{
      sub: string;
      tenantId: string;
      type?: string;
      jti?: string;
    }>(refreshToken, {
      secret: auth?.refreshSecret ?? 'change-me-refresh',
    });

    if (payload.type !== 'refresh') {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const tokenHash = this.hashToken(refreshToken);
    const stored = await this.refreshTokenRepo.findOne({
      where: {
        tokenHash,
        userId: payload.sub,
        tenantId: payload.tenantId,
      },
    });

    if (!stored || stored.revokedAt || stored.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const user = await this.userService.findById(payload.sub);
    const tokens = await this.issueTokens(user);

    stored.userAgent = userAgent ?? stored.userAgent;
    stored.ipAddress = ipAddress ?? stored.ipAddress;
    await this.refreshTokenRepo.save(stored);

    return tokens;
  }

  async logout(refreshToken: string): Promise<void> {
    if (!refreshToken) {
      return;
    }
    const tokenHash = this.hashToken(refreshToken);
    const stored = await this.refreshTokenRepo.findOne({
      where: { tokenHash },
    });
    if (stored && !stored.revokedAt) {
      stored.revokedAt = new Date();
      await this.refreshTokenRepo.save(stored);
    }
  }

  private async issueTokens(user: User): Promise<TokenPair> {
    const auth = this.configService.get<AuthConfig>('auth', { infer: true }) as
      | AuthConfig
      | undefined;

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        tenantId: user.tenantId,
        roles: user.roles,
        email: user.email,
      },
      {
        secret: auth?.accessSecret ?? 'change-me',
        // Cast to unknown first to satisfy JwtSignOptions type expectations
        expiresIn: (auth?.accessExpiresIn ?? '15m') as unknown as number,
      },
    );

    const jti = crypto.randomUUID();
    const refreshToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        tenantId: user.tenantId,
        type: 'refresh',
        jti,
      },
      {
        secret: auth?.refreshSecret ?? 'change-me-refresh',
        // Cast to unknown first to satisfy JwtSignOptions type expectations
        expiresIn: (auth?.refreshExpiresIn ?? '7d') as unknown as number,
      },
    );

    return { accessToken, refreshToken };
  }

  private async persistRefreshToken(params: {
    user: User;
    tenantId: string;
    refreshToken: string;
    userAgent?: string;
    ipAddress?: string;
  }): Promise<void> {
    const tokenHash = this.hashToken(params.refreshToken);
    const decodedUnknown: unknown = this.jwtService.decode(params.refreshToken);

    const decoded = (
      decodedUnknown && typeof decodedUnknown === 'object'
        ? decodedUnknown
        : null
    ) as {
      exp?: number;
    } | null;

    const expiresAt = decoded?.exp
      ? new Date(decoded.exp * 1000)
      : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const entity = this.refreshTokenRepo.create({
      userId: params.user.id,
      tenantId: params.tenantId,
      tokenHash,
      expiresAt,
      userAgent: params.userAgent,
      ipAddress: params.ipAddress,
    });

    await this.refreshTokenRepo.save(entity);
  }

  private hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }
}
