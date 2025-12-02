import { Test, TestingModule } from '@nestjs/testing';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Controlador. / Controller.
import { UserController } from './user.controller';

// Servicio. / Service.
import { UserService } from './user.service';

// Entidad. / Entity.
import { User } from './entities/user.entity';

// ENUM.
import { UserRole } from './enum/user-role.enum';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// DTOs.
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

describe('UserController', () => {
    let userController: UserController;
    let userService: UserService;

    // Mock de los métodos del servicio. 
    const mockUserService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: mockUserService,
                },
            ],
        }).compile();

        userController = module.get<UserController>(UserController);
        userService = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(userController).toBeDefined();
    });

    describe('create', () => {
        it('should create a user', async () => {
            const createUserDto: CreateUserDto = {
                full_name: 'John Doe',
                email: 'john.doe@example.com',
                password: 'password123',
                role: UserRole.REGULAR,
            };

            const result = new User();
            result.id_user = 1;
            result.full_name = createUserDto.full_name ?? 'Default Name'; // Aseguramos que full_name nunca sea undefined.
            result.email = createUserDto.email;
            result.password = createUserDto.password;
            result.role = createUserDto.role ?? UserRole.REGULAR; // Aseguramos que role nunca sea undefined. 

            mockUserService.create.mockResolvedValue(result);

            expect(await userController.create(createUserDto)).toBe(result);
        });
    });

    describe('findAll', () => {
        it('should return all users', async () => {
            const result = [
                new User(),
                new User(),
            ];

            mockUserService.findAll.mockResolvedValue(result);

            expect(await userController.findAll()).toBe(result);
        });
    });

    describe('findOne', () => {
        it('should return a user by id', async () => {
            const result = new User();
            result.id_user = 1;
            result.full_name = 'John Doe';
            result.email = 'john.doe@example.com';

            mockUserService.findOne.mockResolvedValue(result);

            expect(await userController.findOne(1)).toBe(result);
        });

        it('should throw an error if user is not found', async () => {
            mockUserService.findOne.mockResolvedValue(null);

            try {
                await userController.findOne(999);
            } catch (e) {
                expect(e.response.statusCode).toBe(404);
                expect(e.response.message).toBe('User not found');
            }
        });
    });

    describe('update', () => {
        it('should update a user', async () => {
            const updateUserDto: UpdateUserDto = {
                full_name: 'Jane Doe',
            };

            const result = new User();
            result.id_user = 1;
            result.full_name = updateUserDto.full_name ?? 'Default Name';
            result.email = 'john.doe@example.com';
            result.password = 'password123';
            result.role = UserRole.REGULAR;

            mockUserService.update.mockResolvedValue(result);

            expect(await userController.update(1, updateUserDto)).toBe(result);
        });
    });

    describe('remove', () => {
        it('should delete a user', async () => {
            const result = { affected: 1 };

            mockUserService.remove.mockResolvedValue(result);

            expect(await userController.remove(1)).toBe(result);
        });

        it('should throw an error if user to delete does not exist', async () => {
            const result = { affected: 0 };

            mockUserService.remove.mockResolvedValue(result);

            try {
                await userController.remove(999);
            } catch (e) {
                expect(e.response.statusCode).toBe(404);
                expect(e.response.message).toBe('User not found');
            }
        });
    });
});
