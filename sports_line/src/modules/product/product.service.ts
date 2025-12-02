import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Entidad. / Entity.
import { Product } from './entities/product.entity';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// DTOs.
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

@Injectable()
export class ProductService {
    // Constructor.
    constructor(
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,
    ) {}

    // Servicio para crear producto. / Service for creating products.
    async create(dto: CreateProductDto) {
        // Verificar si ya existe un producto con el mismo nombre.
        const exists = await this.productRepo.findOne({ where: { name: dto.name } });

        if (exists) {
            throw new BadRequestException('A product with the same name already exists...');
        }

        const newProduct = this.productRepo.create(dto);
        return await this.productRepo.save(newProduct);
    }

    // Servicio para listar todos los productos. / Service to list all products.
    async findAll() {
        return this.productRepo.find({
            select: ['id_product', 'name', 'description', 'price', 'stock', 'createdAt', 'updatedAt'],
        });
    }

    // Servicio para buscar producto por ID. / Service to search for products by ID.
    async findOne(id_product: number) {
        const product = await this.productRepo.findOne({ where: { id_product } });

        if (!product) {
            throw new NotFoundException(`Product with ID ${id_product} not found.`);
        }

        return product;
    }

    // Servicio para actualizar producto. / Service to update product.
    async update(id_product: number, dto: UpdateProductDto) {
        const product = await this.findOne(id_product);

        Object.assign(product, dto);
        return await this.productRepo.save(product);
    }

    // Servicio para eliminar producto. / Service to delete product.
    async remove(id_product: number) {
        const product = await this.findOne(id_product);

        return await this.productRepo.remove(product);
    }
}
