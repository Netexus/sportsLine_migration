import { Test, TestingModule } from '@nestjs/testing';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Controlador. / Controller.
import { ProductController } from './product.controller';

// Servicio. / Service.
import { ProductService } from './product.service';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// DTOs.
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Mock del ProductService
const mockProductService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
};

describe('ProductController', () => {
    let controller: ProductController;
    let service: ProductService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [
                {
                    provide: ProductService,
                    useValue: mockProductService,
                },
            ],
        }).compile();

        controller = module.get<ProductController>(ProductController);
        service = module.get<ProductService>(ProductService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create a product', async () => {
            const createProductDto: CreateProductDto = {
                name: 'Product C',
                price: 300.0,
                stock: 30,
            };
            const result = { id_product: 1, ...createProductDto };
            mockProductService.create.mockResolvedValue(result);

            expect(await controller.create(createProductDto)).toBe(result);
        });
    });

    describe('findAll', () => {
        it('should return all products', async () => {
            const result = [
                { id_product: 1, name: 'Product A', price: 100.0, stock: 10 },
                { id_product: 2, name: 'Product B', price: 200.0, stock: 20 },
            ];
            mockProductService.findAll.mockResolvedValue(result);

            expect(await controller.findAll()).toBe(result);
        });
    });

    describe('findOne', () => {
        it('should return a product by id', async () => {
            const result = { id_product: 1, name: 'Product A', price: 100.0, stock: 10 };
            mockProductService.findOne.mockResolvedValue(result);

            expect(await controller.findOne(1)).toBe(result);
        });

        it('should throw an error if product is not found', async () => {
            mockProductService.findOne.mockResolvedValue(null);

            try {
                await controller.findOne(999);
            } catch (e) {
                expect(e.response.statusCode).toBe(404);
                expect(e.response.message).toBe('Product with ID 999 not found.');
            }
        });
    });

    describe('update', () => {
        it('should update a product', async () => {
            const updateProductDto: UpdateProductDto = { price: 150.0, stock: 15 };
            const result = { id_product: 1, name: 'Product A', price: 150.0, stock: 15 };
            mockProductService.update.mockResolvedValue(result);

            expect(await controller.update(1, updateProductDto)).toBe(result);
        });
    });

    describe('remove', () => {
        it('should delete a product', async () => {
            const result = { affected: 1 };
            mockProductService.remove.mockResolvedValue(result);

            expect(await controller.remove(1)).toBe(result);
        });

        it('should throw an error if product to delete does not exist', async () => {
            const result = { affected: 0 };
            mockProductService.remove.mockResolvedValue(result);

            try {
                await controller.remove(999);
            } catch (e) {
                expect(e.response.statusCode).toBe(404);
                expect(e.response.message).toBe('Product with ID 999 not found.');
            }
        });
    });
});
