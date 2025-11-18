import { DataSource } from 'typeorm'; // <- Importamos 

// Cargar variables de entorno. 
import * as dotenv from 'dotenv';
dotenv.config({ path: 'sports_line/.env.development' });

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// Entidades. / Entities.
import { Users } from './modules/user/entities/user.entity';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'Qwe.123*',
    database: process.env.DB_DATABASE || 'riwi_sportsline',
    synchronize: false,
    logging: true,
    entities: [Users],
    migrations: ['src/database/migrations/*.ts'],
});