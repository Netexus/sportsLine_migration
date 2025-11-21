import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../shared/base.entity';
import { OrderStatus } from '../enum/order-status.enum';
import { Client } from '../../client/entities/client.entity';

@Entity('orders')
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id_order: number;

    @ManyToOne(() => Client)
    @JoinColumn({ name: 'client_id' })
    client: Client;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total_amount: number;

    @Column({ 
        type: 'enum', 
        enum: OrderStatus, 
        default: OrderStatus.PENDING 
    })
    status: OrderStatus;
}