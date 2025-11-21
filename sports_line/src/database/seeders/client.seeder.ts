import { DataSource } from 'typeorm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Entidad. / Entity
import { Client } from '../../modules/client/entities/client.entity';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

export async function clientSeeder(dataSource: DataSource): Promise<void> {
    console.log('🌱 Starting client seed process...');

    const clientRepository = dataSource.getRepository(Client);

    const count = await clientRepository.count(); // <- Verificamos si ya existen clientes. 

    if (count === 0) {
        const clients = [
            {
                full_name: 'Juan Pérez',
                email: 'juan.perez@example.com',
                phone: '3001234567',
                address: 'Calle 123 #45-67, Bogotá',
            },
            {
                full_name: 'María García',
                email: 'maria.garcia@example.com',
                phone: '3009876543',
                address: 'Carrera 10 #20-30, Medellín',
            },
            {
                full_name: 'Pedro Rodríguez',
                email: 'pedro.rodriguez@example.com',
                phone: '3015678901',
                address: 'Av. Siempre Viva 742, Cali',
            },
        ];

        await clientRepository.save(clients);
        console.log('✅ Clients created successfully!');
    } else {
        console.log('⚠️ Clients already exist, seed omitted.');
    }

    console.log('🌾 Client seed processing complete!');
}