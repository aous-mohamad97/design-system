import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RefreshToken } from './refresh-token.entity';
import { UserModule } from '../user/user.module';
import { TenantModule } from '../tenant/tenant.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('auth.accessSecret') ?? 'change-me',
        signOptions: {
          // Cast to unknown first to avoid eslint any warnings
          expiresIn: (configService.get<string>('auth.accessExpiresIn') ??
            '15m') as unknown as number,
        },
      }),
    }),
    TypeOrmModule.forFeature([RefreshToken]),
    UserModule,
    TenantModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
