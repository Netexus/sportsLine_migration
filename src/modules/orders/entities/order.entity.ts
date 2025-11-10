import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Client } from '../../clients/entities/client.entity';
import { Product } from '../../products/entities/product.entity';

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  SHIPPED = 'SHIPPED',
  CANCELLED = 'CANCELLED',
}

@Entity({ name: 'orders' })
export class Order extends BaseEntity {
  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  total: number;

  @ManyToOne(() => Client, (client) => client.orders, { nullable: false })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @ManyToMany(() => Product, (product) => product.orders)
  @JoinTable({
    name: 'orders_products',
    joinColumn: { name: 'order_id' },
    inverseJoinColumn: { name: 'product_id' },
  })
  products: Product[];
}
