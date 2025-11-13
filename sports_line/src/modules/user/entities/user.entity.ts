import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRole } from '../enum/user-role.enum';
import { BaseEntity } from '../../../shared/base.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_user: number;

    @Column({ type: 'varchar', length: 100 })
    full_name: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @Column({ 
        type: 'enum', 
        enum: UserRole, 
        default: UserRole.REGULAR 
    })
    role: UserRole;

    @Column({ type: 'varchar', unique: true })
    email: string;
}