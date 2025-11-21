import { DataSource } from 'typeorm';

// - - - - - - - - - - - - - - - - - - -
// Entidades. / Entities.
import { OrderItem } from '../../modules/order-item/entities/order-item.entity';
import { Order } from '../../modules/order/entities/order.entity';
import { Product } from '../../modules/product/entities/product.entity';

// - - - - - - - - - - - - - - - - - - -

export async function orderItemSeeder(dataSource: DataSource): Promise<void> {
    console.log('🌱 Starting OrderItem seed...');

    const orderItemRepository = dataSource.getRepository(OrderItem);
    const orderRepository = dataSource.getRepository(Order);
    const productRepository = dataSource.getRepository(Product);

    const count = await orderItemRepository.count();

    if (count === 0) {
        const orders = await orderRepository.find();
        const products = await productRepository.find();

        if (orders.length < 3 || products.length < 3) {
            console.log('⚠️ Need at least 3 orders and 3 products to seed order items.');
            return;
        }

        const items = [
            {
                order: orders[0],
                product: products[0],
                quantity: 2,
                price: Number(products[0].price),
            },
            {
                order: orders[1],
                product: products[1],
                quantity: 1,
                price: Number(products[1].price),
            },
            {
                order: orders[2],
                product: products[2],
                quantity: 3,
                price: Number(products[2].price),
            },
        ];

        await orderItemRepository.save(items);
        console.log('✅ OrderItems created successfully!');
    } else {
        console.log('⚠️ OrderItems already exist, seed omitted.');
    }

    console.log('🌾 OrderItem seed processing complete!');
}