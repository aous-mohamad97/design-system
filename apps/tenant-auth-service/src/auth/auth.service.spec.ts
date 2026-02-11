import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { AuthService, type TokenPair } from './auth.service';
import { RefreshToken } from './refresh-token.entity';
import { UserService } from '../user/user.service';
import { TenantService } from '../tenant/tenant.service';
import { User, UserRole } from '../user/user.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: jest.Mocked<UserService>;
  let tenantService: jest.Mocked<TenantService>;
  let jwtService: jest.Mocked<JwtService>;
  let refreshRepo: jest.Mocked<Repository<RefreshToken>>;

  const user: User = {
    id: 'user-1',
    email: 'admin@example.com',
    passwordHash: 'hashed',
    isActive: true,
    roles: [UserRole.TENANT_ADMIN],
    tenantId: 'tenant-1',
    tenant: {} as any,
    refreshTokens: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    userService = {
      findByEmailAndTenant: jest.fn(),
      validatePassword: jest.fn(),
      findById: jest.fn(),
    } as any;

    tenantService = {
      findByKey: jest.fn().mockResolvedValue({ id: 'tenant-1' }),
    } as any;

    jwtService = {
      signAsync: jest.fn().mockResolvedValue('token'),
      verify: jest.fn(),
      decode: jest.fn(),
    } as any;

    refreshRepo = {
      create: jest.fn((data) => data as any),
      save: jest.fn(),
      findOne: jest.fn(),
    } as any;

    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: userService },
        { provide: TenantService, useValue: tenantService },
        { provide: JwtService, useValue: jwtService },
        { provide: getRepositoryToken(RefreshToken), useValue: refreshRepo },
      ],
    }).compile();

    authService = moduleRef.get(AuthService);
  });

  it('logs in with valid credentials', async () => {
    userService.findByEmailAndTenant.mockResolvedValue(user);
    userService.validatePassword.mockResolvedValue(true);

    const result = await authService.login({
      email: user.email,
      password: 'password',
      tenantKey: 'default',
    });

    expect(result.user.email).toBe(user.email);
    expect((result.tokens as TokenPair).accessToken).toBeDefined();
    expect(refreshRepo.save).toHaveBeenCalled();
  });
});

