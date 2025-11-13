import { DataSource } from 'typeorm'; // <- Importamos
import { UserRole } from 'src/modules/user/enum/user-role.enum';

import { User } from '../../modules/user/entities/user.entity'; // <- Importamos nuestra entidad "User". /

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export async function runSeeders(dataSource: DataSource): Promise<void> {
    console.log('🌱 Iniciando proceso de semillas...');

    const userRepository = dataSource.getRepository(User);

    const count = await userRepository.count();
    if (count === 0) {
        await userRepository.save([
        {
          full_name: 'Admin User',
          password: 'admin123',
          role: UserRole.ADMIN,
          email: 'admin@example.com',
        },
        {
            full_name: 'Regular User',
            password: 'user123',
            role: UserRole.REGULAR,
            email: 'user@example.com',
        },
        ]);
        console.log('✅ Usuarios creados correctamente');
    } else {
        console.log('⚠️ Ya existen usuarios, semilla omitida');
    }

    console.log('🌾 Proceso de semillas completado');
}
