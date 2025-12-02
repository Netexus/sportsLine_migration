import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';

import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Servicio. / Service.
import { ClientService } from './client.service';

// Entidad. / Entity.
import { Client } from './entities/client.entity';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Mock del ClientRepository
const mockClientRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
};

describe('ClientService', () => {
    let service: ClientService;
    let repository: Repository<Client>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ClientService,
                {
                    provide: getRepositoryToken(Client),
                    useValue: mockClientRepository,
                },
            ],
        }).compile();

        service = module.get<ClientService>(ClientService);
        repository = module.get<Repository<Client>>(getRepositoryToken(Client));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should throw an error if email already exists', async () => {
            const dto = { full_name: 'Jane Doe', email: 'jane@example.com', phone: '1234567890' };
            mockClientRepository.findOne.mockResolvedValue({ email: 'jane@example.com' } as any);

            await expect(service.create(dto)).rejects.toThrow(BadRequestException);
        });

        it('should throw an error if phone already exists', async () => {
            const dto = { full_name: 'Jane Doe', email: 'jane@example.com', phone: '1234567890' };
            mockClientRepository.findOne.mockResolvedValue({ phone: '1234567890' } as any);

            await expect(service.create(dto)).rejects.toThrow(BadRequestException);
        });

        it('should successfully create a new client', async () => {
            const dto = { full_name: 'Jane Doe', email: 'jane@example.com', phone: '1234567890' };
            const savedClient = { ...dto, id_client: 1 };
            mockClientRepository.findOne.mockResolvedValue(null);
            mockClientRepository.create.mockReturnValue(savedClient);
            mockClientRepository.save.mockResolvedValue(savedClient);

            const result = await service.create(dto);
            expect(result).toEqual(savedClient);
        });
    });

    describe('findAll', () => {
        it('should return an array of clients', async () => {
            const clients = [{ id_client: 1, full_name: 'Jane Doe', email: 'jane@example.com', phone: '1234567890' }];
            mockClientRepository.find.mockResolvedValue(clients);

            const result = await service.findAll();
            expect(result).toEqual(clients);
        });
    });

    describe('findOne', () => {
        it('should throw an error if client not found', async () => {
            mockClientRepository.findOne.mockResolvedValue(null);
            await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
        });

        it('should return a client if found', async () => {
            const client = { id_client: 1, full_name: 'Jane Doe', email: 'jane@example.com', phone: '1234567890' };
            mockClientRepository.findOne.mockResolvedValue(client);

            const result = await service.findOne(1);
            expect(result).toEqual(client);
        });
    });

    describe('update', () => {
        it('should update and return the updated client', async () => {
            const updateDto = { full_name: 'Updated Name' };
            const updatedClient = { id_client: 1, full_name: 'Updated Name', email: 'jane@example.com', phone: '1234567890' };
            mockClientRepository.findOne.mockResolvedValue(updatedClient);
            mockClientRepository.save.mockResolvedValue(updatedClient);

            const result = await service.update(1, updateDto);
            expect(result).toEqual(updatedClient);
        });

        it('should throw an error if client not found for update', async () => {
            const updateDto = { full_name: 'Updated Name' };
            mockClientRepository.findOne.mockResolvedValue(null);

            await expect(service.update(999, updateDto)).rejects.toThrow(NotFoundException);
        });
    });

    describe('remove', () => {
        it('should remove a client', async () => {
            const client = { id_client: 1, full_name: 'Jane Doe', email: 'jane@example.com', phone: '1234567890' };
            mockClientRepository.findOne.mockResolvedValue(client);
            mockClientRepository.remove.mockResolvedValue(client);

            const result = await service.remove(1);
            expect(result).toEqual(client);
        });

        it('should throw an error if client not found when removing', async () => {
            mockClientRepository.findOne.mockResolvedValue(null);
            await expect(service.remove(999)).rejects.toThrow(NotFoundException);
        });
    });
});
