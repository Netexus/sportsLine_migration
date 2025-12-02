import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Entidad. / Entity.
import { Client } from './entities/client.entity';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// DTOs.
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

@Injectable()
export class ClientService {
    // Constructor.
    constructor(
        @InjectRepository(Client)
        private readonly clientRepo: Repository<Client>,
    ) {}

    // Servicio para crear cliente. / Service for creating clients.
    async create(dto: CreateClientDto) {
        // Verificar si ya existe un cliente con el mismo email.
        const emailExists = await this.clientRepo.findOne({ where: { email: dto.email } });
        if (emailExists) {
            throw new BadRequestException('A client with this email already exists...');
        }

        // Verificar si ya existe un cliente con el mismo teléfono.
        const phoneExists = await this.clientRepo.findOne({ where: { phone: dto.phone } });
        if (phoneExists) {
            throw new BadRequestException('A client with this phone number already exists...');
        }

        const newClient = this.clientRepo.create(dto);
        return await this.clientRepo.save(newClient);
    }

    // Servicio para listar todos los clientes. / Service to list all clients.
    async findAll() {
        return this.clientRepo.find({
            select: ['id_client', 'full_name', 'email', 'phone', 'address', 'createdAt', 'updatedAt'],
        });
    }

    // Servicio para buscar cliente por ID. / Service to search for clients by ID.
    async findOne(id_client: number) {
        const client = await this.clientRepo.findOne({ where: { id_client } });

        if (!client) {
            throw new NotFoundException(`Client with ID ${id_client} not found.`);
        }

        return client;
    }

    // Servicio para actualizar cliente. / Service to update client.
    async update(id_client: number, dto: UpdateClientDto) {
        const client = await this.findOne(id_client);

        Object.assign(client, dto);
        return await this.clientRepo.save(client);
    }

    // Servicio para eliminar cliente. / Service to delete client.
    async remove(id_client: number) {
        const client = await this.findOne(id_client);

        return await this.clientRepo.remove(client);
    }
}
