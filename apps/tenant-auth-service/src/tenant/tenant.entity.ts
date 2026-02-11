import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('tenants')
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  key!: string; // e.g. tenant slug

  @Column()
  name!: string;

  @Column('text', { array: true, nullable: true })
  domains?: string[] | null;

  @Column({ default: true })
  isActive!: boolean;

  @OneToMany(() => User, (user) => user.tenant)
  users!: User[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
