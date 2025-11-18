import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../enum/user-role.enum';
import { BaseEntity } from '../../../shared/base.entity';

@Entity({ name: 'users' })
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_user: number;

    @Column({ type: 'varchar', length: 100 })
    full_name: string;

    @Column()
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
        if (!this.password) return;

        if (this.password.startsWith('$2')) return;
        this.password = await bcrypt.hash(this.password, 10);
    }

    @Column({ 
        type: 'enum', 
        enum: UserRole, 
        default: UserRole.REGULAR 
    })
    role: UserRole;

    @Column({ type: 'varchar', unique: true })
    email: string;
}