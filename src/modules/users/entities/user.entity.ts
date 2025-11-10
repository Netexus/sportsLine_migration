import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

export enum UserRole {
  ADMIN = 'ADMIN',
  COACH = 'COACH',
  SUPPORT = 'SUPPORT',
}

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.SUPPORT })
  role: UserRole;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}
