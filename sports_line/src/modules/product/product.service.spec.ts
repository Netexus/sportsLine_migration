import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';

import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Servicio. / Service.
import { ProductService } from './product.service';

// Entidad. / Entity.
import { Product } from './entities/product.entity';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Mock del ProductRepository.
const mockProductRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
};

describe('ProductService', () => {
    let service: ProductService;
    let repository: Repository<Product>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductService,
                {
                    provide: getRepositoryToken(Product),
                    useValue: mockProductRepository,
                },
            ],
        }).compile();

        service = module.get<ProductService>(ProductService);
        repository = module.get<Repository<Product>>(getRepositoryToken(Product));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should throw an error if product name already exists', async () => {
            const dto = { name: 'Product A', price: 100.0, stock: 10 };
            mockProductRepository.findOne.mockResolvedValue({ name: 'Product A' });

            await expect(service.create(dto)).rejects.toThrow(BadRequestException);
        });

        it('should successfully create a new product', async () => {
            const dto = { name: 'Product B', price: 200.0, stock: 20 };
            const savedProduct = { ...dto, id_product: 1 };
            mockProductRepository.findOne.mockResolvedValue(null);
            mockProductRepository.create.mockReturnValue(savedProduct);
            mockProductRepository.save.mockResolvedValue(savedProduct);

            const result = await service.create(dto);
            expect(result).toEqual(savedProduct);
        });
    });

    describe('findAll', () => {
        it('should return an array of products', async () => {
            const products = [
                { id_product: 1, name: 'Product A', price: 100.0, stock: 10 },
                { id_product: 2, name: 'Product B', price: 200.0, stock: 20 },
            ];
            mockProductRepository.find.mockResolvedValue(products);

            const result = await service.findAll();
            expect(result).toEqual(products);
        });
    });

    describe('findOne', () => {
        it('should throw an error if product not found', async () => {
            mockProductRepository.findOne.mockResolvedValue(null);
            await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
        });

        it('should return a product if found', async () => {
            const product = { id_product: 1, name: 'Product A', price: 100.0, stock: 10 };
            mockProductRepository.findOne.mockResolvedValue(product);

            const result = await service.findOne(1);
            expect(result).toEqual(product);
        });
    });

    describe('update', () => {
        it('should update and return the updated product', async () => {
            const updateDto = { price: 150.0, stock: 15 };
            const updatedProduct = { id_product: 1, name: 'Product A', price: 150.0, stock: 15 };
            mockProductRepository.findOne.mockResolvedValue(updatedProduct);
            mockProductRepository.save.mockResolvedValue(updatedProduct);

            const result = await service.update(1, updateDto);
            expect(result).toEqual(updatedProduct);
        });

        it('should throw an error if product not found for update', async () => {
            const updateDto = { price: 150.0, stock: 15 };
            mockProductRepository.findOne.mockResolvedValue(null);

            await expect(service.update(999, updateDto)).rejects.toThrow(NotFoundException);
        });
    });

    describe('remove', () => {
        it('should remove a product', async () => {
            const product = { id_product: 1, name: 'Product A', price: 100.0, stock: 10 };
            mockProductRepository.findOne.mockResolvedValue(product);
            mockProductRepository.remove.mockResolvedValue(product);

            const result = await service.remove(1);
            expect(result).toEqual(product);
        });

        it('should throw an error if product not found when removing', async () => {
            mockProductRepository.findOne.mockResolvedValue(null);
            await expect(service.remove(999)).rejects.toThrow(NotFoundException);
        });
    });
});
