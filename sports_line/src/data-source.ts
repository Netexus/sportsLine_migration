import { DataSource } from 'typeorm'; // <- Importamos 

// Cargar variables de entorno. 
import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// Entidades. / Entities.
import { User } from './modules/user/entities/user.entity';
import { Client } from './modules/client/entities/client.entity';
import { Product } from './modules/product/entities/product.entity';
import { Order } from './modules/order/entities/order.entity';
import { OrderItem } from './modules/order-item/entities/order-item.entity';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'Qwe.123*',
    database: process.env.DB_NAME || 'riwi_sportsline',
    synchronize: false,
    logging: true,
    entities: [User, Client, Product, Order, OrderItem],
    migrations: ['src/database/migrations/*.ts'],
});
