import { DataSource } from 'typeorm';

import { userSeeder } from './user.seeder';
import { clientSeeder } from './client.seeder';
import { productSeeder } from './product.seeder';
import { orderSeeder } from './order.seeder';
import { orderItemSeeder } from './order-item.seeder';

export async function runSeeders(dataSource: DataSource) {
    console.log('🌱 Running all seeders...\n');

    await userSeeder(dataSource);
    await clientSeeder(dataSource);
    await productSeeder(dataSource);
    await orderSeeder(dataSource);
    await orderItemSeeder(dataSource);

    console.log('\n🌾 All seeders executed successfully!');
}
