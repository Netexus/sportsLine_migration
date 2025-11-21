import { DataSource } from 'typeorm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Entidad. / Entity
import { User } from '../../modules/user/entities/user.entity';

// Enum.
import { UserRole } from '../../modules/user/enum/user-role.enum';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export async function userSeeder(dataSource: DataSource): Promise<void> {
    console.log('🌱 Starting the seed process...');

    const userRepository = dataSource.getRepository(User);

    const count = await userRepository.count(); // <- Verificamos si ya existen usuarios. 

    if (count === 0) {

        const users = [
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
        ];

        await userRepository.save(users);
        console.log('✅ Users created successfully!');
    } else {
        console.log('⚠️ Users already exist, seed omitted.');
    }

    console.log('🌾 User seed processing complete!');
}