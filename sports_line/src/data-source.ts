import { DataSource } from 'typeorm'; // <- Importamos 

// Cargar variables de entorno. 
import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

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
    entities: [__dirname + '/modules/**/*.entity.{ts,js}'],
    migrations: [__dirname + '/migrations/*.{ts,js}'],
});
