import { TypeOrmModuleOptions } from '@nestjs/typeorm'; // <- Importamos 
import { ConfigService } from '@nestjs/config'; // <- Importamos 
import { DataSource } from 'typeorm'; // <- Importamos 

import { User } from '../../modules/user/entities/user.entity'; // <- Importamos nuestra entidad "User". /
// <- Importamos nuestra entidad "Client". /
// <- Importamos nuestra entidad "Product". /
// <- Importamos nuestra entidad "Order". /
// <- Importamos nuestra entidad "OrderItem". / 

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// Creamos la conexión a la base de datos. / 

export const getTypeOrmConfig = async (
    configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    autoLoadEntities: true,
    synchronize: true,
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// Exportamos un DataSource independiente (para usarlo fuera de Nest). / 

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User],
    synchronize: true,
});