import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { ClientsService } from './clients.service';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOneOrFail(id);
  }

  @Post()
  create(@Body() payload: CreateClientDto) {
    return this.clientsService.create(payload);
  }
}
