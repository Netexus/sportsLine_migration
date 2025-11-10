import dataSource from '../typeorm.config';
import { Client } from '../../modules/clients/entities/client.entity';
import { Order, OrderStatus } from '../../modules/orders/entities/order.entity';
import { Product } from '../../modules/products/entities/product.entity';
import { User, UserRole } from '../../modules/users/entities/user.entity';

async function seed() {
  await dataSource.initialize();

  const orderRepository = dataSource.getRepository(Order);
  const productRepository = dataSource.getRepository(Product);
  const clientRepository = dataSource.getRepository(Client);
  const userRepository = dataSource.getRepository(User);

  await orderRepository.delete({});
  await productRepository.delete({});
  await clientRepository.delete({});
  await userRepository.delete({});

  const admin = userRepository.create({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@sportsline.io',
    password: 'changeme',
    role: UserRole.ADMIN,
  });
  await userRepository.save(admin);

  const client = clientRepository.create({
    fullName: 'Cliente Demo',
    email: 'cliente@sportsline.io',
    phone: '+57 300 000 0000',
    address: 'Calle 1 # 2-3, Medellin',
  });
  await clientRepository.save(client);

  const demoProducts = productRepository.create([
    {
      name: 'Balon Futbol #5',
      description: 'Balon certificado FIFA Quality Pro.',
      price: 180000,
      stock: 12,
    },
    {
      name: 'Guayos Adidas Predator',
      description: 'Edicion 2024 con tobillera elastica.',
      price: 520000,
      stock: 5,
    },
  ]);

  const products = await productRepository.save(demoProducts);

  const order = orderRepository.create({
    client,
    products,
    status: OrderStatus.PAID,
    total: products.reduce((acc, product) => acc + Number(product.price), 0),
  });

  await orderRepository.save(order);

  console.log('Seed data loaded successfully');
  if (dataSource.isInitialized) {
    await dataSource.destroy();
  }
}

seed().catch(async (error) => {
  console.error('Seed execution failed', error);
  if (dataSource.isInitialized) {
    await dataSource.destroy();
  }
  process.exit(1);
});
