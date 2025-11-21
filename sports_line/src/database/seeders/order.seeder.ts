import { DataSource } from 'typeorm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Entidades. / Entities.
import { Order } from '../../modules/order/entities/order.entity';
import { Client } from '../../modules/client/entities/client.entity';

// Enum.
import { OrderStatus } from '../../modules/order/enum/order-status.enum';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

export async function orderSeeder(dataSource: DataSource): Promise<void> {
    console.log('🌱 Starting order seed process...');

    const orderRepository = dataSource.getRepository(Order);
    const clientRepository = dataSource.getRepository(Client);

    const count = await orderRepository.count(); // Verificar si ya existen órdenes.

    if (count === 0) {

        // Obtener clientes existentes
        const clients = await clientRepository.find();

        if (clients.length < 3) {
            console.log('⚠️ Not enough clients found. At least 3 clients are needed to seed orders.');
            return;
        }

        const orders = [
            {
                client: clients[0],
                total_amount: 60000.00,
                status: OrderStatus.PENDING,
            },
            {
                client: clients[1],
                total_amount: 120000.00,
                status: OrderStatus.COMPLETED,
            },
            {
                client: clients[2],
                total_amount: 34000.00,
                status: OrderStatus.CANCELED,
            },
        ];

        await orderRepository.save(orders);
        console.log('✅ Orders created successfully!');
    } else {
        console.log('⚠️ Orders already exist, seed omitted.');
    }

    console.log('🌾 Order seed processing complete!');
}
