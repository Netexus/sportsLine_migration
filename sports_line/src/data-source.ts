import { DataSource } from 'typeorm'; // <- Importamos 

import { Users } from './modules/user/entities/user.entity';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "Qwe.123*",
    database: process.env.DB_NAME || "riwi_sportsline",
    synchronize: false,
    logging: true,
    entities: [Users],
    migrations: ['src/database/migrations/*.ts'],
});