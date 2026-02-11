import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import {
  ExtractJwt,
  Strategy as JwtStrategyBase,
  type StrategyOptions,
} from 'passport-jwt';
import type { AuthConfig } from '../config/auth.config';
import { UserRole } from '../user/user.entity';

export interface JwtPayload {
  sub: string;
  tenantId: string;
  roles: UserRole[];
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(JwtStrategyBase) {
  constructor(configService: ConfigService) {
    const auth = configService.get<AuthConfig>('auth', { infer: true });
    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: auth?.accessSecret ?? 'change-me',
    };
    super(options);
  }

  validate(payload: JwtPayload) {
    return {
      userId: payload.sub,
      tenantId: payload.tenantId,
      roles: payload.roles,
      email: payload.email,
    };
  }
}
