import { DataSource } from "typeorm";

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import { Product } from "src/modules/product/entities/product.entity";

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export async function productSeeder(dataSource: DataSource): Promise<void> {
    console.log('🌱 Starting the seed process...');

    const productRepository = dataSource.getRepository(Product);

    const count = await productRepository.count(); // <- Verificamos si ya existen productos en la base de datos. 
    
    if (count === 0) {

        const products = [
            {
                name: 'Product 1',
                description: 'Description of Product 1',
                price: 100.00,
                stock: 50
            },
            {
                name: 'Product 2',
                description: 'Description of Product 2',
                price: 150.00,
                stock: 30
            },
            {
                name: 'Product 3',
                description: 'Description of Product 3',
                price: 200.00,
                stock: 20
            },
            {
                name: 'Product 4',
                description: 'Description of Product 4',
                price: 80.00,
                stock: 100
            }
        ];

        await productRepository.save(products);
        console.log('✅ Products created successfully!');
    } else {
        console.log('⚠️ Products already exist, seed omitted.');
    }

    console.log('🌾 Product seed processing complete!');
}