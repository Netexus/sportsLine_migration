import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientsRepository: Repository<Client>,
  ) {}

  create(payload: CreateClientDto): Promise<Client> {
    const client = this.clientsRepository.create(payload);
    return this.clientsRepository.save(client);
  }

  findAll(): Promise<Client[]> {
    return this.clientsRepository.find({
      relations: ['orders', 'orders.products'],
    });
  }

  async findOneOrFail(id: string): Promise<Client> {
    const client = await this.clientsRepository.findOne({
      where: { id },
      relations: ['orders', 'orders.products'],
    });

    if (!client) {
      throw new NotFoundException(`Client with id ${id} was not found`);
    }

    return client;
  }
}
