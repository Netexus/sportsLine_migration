import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// - - - - - - - - - - - - - - - - - - -
// Entidad base. / Base entity.
import { BaseEntity } from '../../../shared/base.entity';

// - - - - - - - - - - - - - - - - - - -

@Entity('products')
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_product: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ type: 'int', default: 0 })
    stock: number;
}