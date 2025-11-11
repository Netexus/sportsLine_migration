import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from 'src/shared/base.entity';

@Entity('clients')
export class Client extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_client: number;

    @Column({ type: 'varchar', length: 100 })
    full_name: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 10, unique: true })
    phone: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    address: string;
}