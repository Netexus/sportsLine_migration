import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

// - - - - - - - - - - - - - - - - - - -
// Entidades. / Entities.
import { BaseEntity } from '../../../shared/base.entity';
import { Order } from '../../order/entities/order.entity';
import { Product } from '../../product/entities/product.entity';

// - - - - - - - - - - - - - - - - - - -

@Entity('order_items')
export class OrderItem extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_order_item: number;

    @ManyToOne(() => Order)
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column({ type: 'int', default: 1 })
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;
}