import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';  // Tu entidad User
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

// Mock del UserRepository
const mockUserRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
};

describe('UserService', () => {
    let service: UserService;
    let repository: Repository<User>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService, // Solo inyectamos UserService
                {
                    provide: getRepositoryToken(User),
                    useValue: mockUserRepository, // Mock del repositorio
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);  // Obtén UserService
        repository = module.get<Repository<User>>(getRepositoryToken(User));  // Obtén el repositorio de User
    });

    afterEach(() => {
        jest.clearAllMocks(); // Limpiar mocks después de cada prueba
    });

    it('should be defined', () => {
        expect(service).toBeDefined();  // Verifica que UserService esté definido
    });

    describe('create', () => {
        it('should throw an error if email already exists', async () => {
            const dto = { full_name: 'John Doe', email: 'john@example.com', password: 'password123' };
            mockUserRepository.findOne.mockResolvedValue({ email: 'john@example.com' } as any); // Simulamos que el email ya está registrado

            await expect(service.create(dto)).rejects.toThrow(BadRequestException);
        });

        it('should successfully create a new user', async () => {
            const dto = { full_name: 'John Doe', email: 'john@example.com', password: 'password123' };
            const savedUser = { ...dto, id_user: 1, role: 'REGULAR' };
            mockUserRepository.findOne.mockResolvedValue(null);  // Simulamos que el usuario no existe
            mockUserRepository.create.mockReturnValue(savedUser);
            mockUserRepository.save.mockResolvedValue(savedUser);

            const result = await service.create(dto);

            expect(result).toEqual(savedUser);  // Verifica que el usuario se creó correctamente
            expect(mockUserRepository.create).toHaveBeenCalledWith(dto);  // Verifica que el repositorio fue llamado correctamente
            expect(mockUserRepository.save).toHaveBeenCalledWith(savedUser);
        });
    });

    describe('findAll', () => {
        it('should return an array of users', async () => {
            const users = [{ id_user: 1, full_name: 'John Doe', email: 'john@example.com', role: 'REGULAR' }];
            mockUserRepository.find.mockResolvedValue(users);

            const result = await service.findAll();
            expect(result).toEqual(users);
        });
    });

    describe('findOne', () => {
        it('should throw an error if user not found', async () => {
            const id_user = 1;
            mockUserRepository.findOne.mockResolvedValue(null);  // Simulamos que el usuario no existe

            await expect(service.findOne(id_user)).rejects.toThrow(NotFoundException);
        });

        it('should return a user if found', async () => {
            const user = { id_user: 1, full_name: 'John Doe', email: 'john@example.com', role: 'REGULAR' };
            mockUserRepository.findOne.mockResolvedValue(user);

            const result = await service.findOne(1);
            expect(result).toEqual(user);
        });
    });

    describe('update', () => {
        it('should update and return a user', async () => {
            const id_user = 1;
            const updateDto = { full_name: 'John Doe Updated' };
            const updatedUser = { id_user, full_name: 'John Doe Updated', email: 'john@example.com', role: 'REGULAR' };

            mockUserRepository.findOne.mockResolvedValue(updatedUser);  // Simulamos que el usuario existe
            mockUserRepository.save.mockResolvedValue(updatedUser);

            const result = await service.update(id_user, updateDto);
            expect(result).toEqual(updatedUser);
        });

        it('should throw an error if user not found when updating', async () => {
            const id_user = 999;
            const updateDto = { full_name: 'Non Existent User' };

            mockUserRepository.findOne.mockResolvedValue(null);  // Simulamos que el usuario no existe

            await expect(service.update(id_user, updateDto)).rejects.toThrow(NotFoundException);
        });
    });

    describe('remove', () => {
        it('should remove a user', async () => {
            const id_user = 1;
            const user = { id_user, full_name: 'John Doe', email: 'john@example.com', role: 'REGULAR' };
            mockUserRepository.findOne.mockResolvedValue(user);  // Simulamos que el usuario existe
            mockUserRepository.remove.mockResolvedValue(user);

            const result = await service.remove(id_user);
            expect(result).toEqual(user);
            expect(mockUserRepository.remove).toHaveBeenCalledWith(user);
        });

        it('should throw an error if user not found when removing', async () => {
            const id_user = 1;
            mockUserRepository.findOne.mockResolvedValue(null);  // Simulamos que el usuario no existe

            await expect(service.remove(id_user)).rejects.toThrow(NotFoundException);
        });
    });
});
