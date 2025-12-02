import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';


// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Controlador. / Controller.
import { ClientController } from './client.controller';

// Servicio. / Service.
import { ClientService } from './client.service';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// DTOs.
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Mock del ClientService.
const mockClientService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
};

describe('ClientController', () => {
    let controller: ClientController;
    let service: ClientService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ClientController],
            providers: [
                {
                    provide: ClientService,
                    useValue: mockClientService,
                },
            ],
        }).compile();

        controller = module.get<ClientController>(ClientController);
        service = module.get<ClientService>(ClientService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create a client', async () => {
            const createClientDto: CreateClientDto = {
                full_name: 'Jane Doe',
                email: 'jane@example.com',
                phone: '1234567890',
            };
            const result = { id_client: 1, ...createClientDto };
            mockClientService.create.mockResolvedValue(result);

            expect(await controller.create(createClientDto)).toBe(result);
        });
    });

    describe('findAll', () => {
        it('should return all clients', async () => {
            const result = [{ id_client: 1, full_name: 'Jane Doe', email: 'jane@example.com', phone: '1234567890' }];
            mockClientService.findAll.mockResolvedValue(result);

            expect(await controller.findAll()).toBe(result);
        });
    });

    describe('findOne', () => {
        it('should return a client by id', async () => {
            const result = { id_client: 1, full_name: 'Jane Doe', email: 'jane@example.com', phone: '1234567890' };
            mockClientService.findOne.mockResolvedValue(result);

            expect(await controller.findOne(1)).toBe(result);
        });

        it('should throw an error if client is not found', async () => {
            mockClientService.findOne.mockResolvedValue(null);

            try {
                await controller.findOne(999);
            } catch (e) {
                expect(e.response.statusCode).toBe(404);
                expect(e.response.message).toBe('Client with ID 999 not found.');
            }
        });
    });

    describe('update', () => {
        it('should update a client', async () => {
            const updateClientDto: UpdateClientDto = { full_name: 'Updated Name' };
            const result = { id_client: 1, full_name: 'Updated Name', email: 'jane@example.com', phone: '1234567890' };
            mockClientService.update.mockResolvedValue(result);

            expect(await controller.update(1, updateClientDto)).toBe(result);
        });
    });

    describe('remove', () => {
        it('should delete a client', async () => {
            const result = { affected: 1 };
            mockClientService.remove.mockResolvedValue(result);

            expect(await controller.remove(1)).toBe(result);
        });

        it('should throw an error if client to delete does not exist', async () => {
            const result = { affected: 0 };
            mockClientService.remove.mockResolvedValue(result);

            try {
                await controller.remove(999);
            } catch (e) {
                expect(e.response.statusCode).toBe(404);
                expect(e.response.message).toBe('Client with ID 999 not found.');
            }
        });
    });
});
