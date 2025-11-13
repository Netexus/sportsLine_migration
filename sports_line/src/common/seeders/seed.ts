import { DataSource } from 'typeorm'; // <- Importamos
import { UserRole } from '../../modules/user/enum/user-role.enum';
import { hashPassword } from '../../shared/bcrypt.config';  // Importa la función hashPassword. / 

import { User } from '../../modules/user/entities/user.entity'; // <- Importamos nuestra entidad "User". /

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export async function runSeeders(dataSource: DataSource): Promise<void> {
    console.log('🌱 Starting the seed process...');

    const userRepository = dataSource.getRepository(User);

    const count = await userRepository.count();
    if (count === 0) {
        const adminPassword = await hashPassword('admin123');  // Hashear la contraseña del admin. /
        const userPassword = await hashPassword('user123');    // Hashear la contraseña del usuario regular. /

        await userRepository.save([
        {
          full_name: 'Admin User',
          password: adminPassword,
          role: UserRole.ADMIN,
          email: 'admin@example.com',
        },
        {
            full_name: 'Regular User',
            password: userPassword,
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