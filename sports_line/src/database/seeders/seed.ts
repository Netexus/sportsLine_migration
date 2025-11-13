import { DataSource } from 'typeorm'; // <- Importamos
import { UserRole } from '../../modules/user/enum/user-role.enum';

import { Users } from '../../modules/user/entities/user.entity'; // <- Importamos nuestra entidad "User". /

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export async function runSeeders(dataSource: DataSource): Promise<void> {
    console.log('🌱 Starting the seed process...');

    const userRepository = dataSource.getRepository(Users);

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
            password: 'regular123',
            role: UserRole.REGULAR,
            email: 'user@example.com',
        },
        ]);
        console.log('✅ Users created successfully!');
    } else {
        console.log('⚠️ Users already exist, seed omitted.');
    }

    console.log('🌾 Seed processing completed!');
}