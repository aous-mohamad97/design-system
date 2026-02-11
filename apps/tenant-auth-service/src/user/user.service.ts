import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { Hash, compare, hash } from 'bcrypt';
import bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findById(id: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({
      where: { email: email.toLowerCase() },
    });
  }

  async findByEmailAndTenant(
    email: string,
    tenantId: string,
  ): Promise<User | null> {
    return this.userRepo.findOne({
      where: { email: email.toLowerCase(), tenantId },
    });
  }

  async createUser(data: {
    email: string;
    password: string;
    tenantId: string;
    roles?: User['roles'];
  }): Promise<User> {
    const passwordHash = await this.hashPassword(data.password);
    const user = this.userRepo.create({
      email: data.email.toLowerCase(),
      passwordHash,
      tenantId: data.tenantId,
      ...(data.roles ? { roles: data.roles } : {}),
    });
    return this.userRepo.save(user);
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    const result = (await bcrypt.compare(
      password,
      user.passwordHash,
    )) as boolean;
    return result;
  }

  async changePassword(userId: string, newPassword: string): Promise<void> {
    const user = await this.findById(userId);
    user.passwordHash = await this.hashPassword(newPassword);
    await this.userRepo.save(user);
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS ?? 10);
    const hashValue = (await bcrypt.hash(password, saltRounds)) as Hash;
    return hashValue as unknown as string;
  }
}
