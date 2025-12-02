import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Servicio. / Service.
import { ClientService } from './client.service';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// DTOs.
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

@Controller('clients')
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    // Controlador para crear cliente. / Controller for creating clients.
    @Post()
    create(@Body() dto: CreateClientDto) {
        return this.clientService.create(dto);
    }

    // Controlador para listar todos los clientes. / Controller to list all clients.
    @Get()
    findAll() {
        return this.clientService.findAll();
    }

    // Controlador para buscar cliente por ID. / Controller to search for client by ID.
    @Get(':id_client')
    findOne(@Param('id_client', ParseIntPipe) id_client: number) {
        return this.clientService.findOne(id_client);
    }

    // Controlador para actualizar cliente. / Controller for updating clients.
    @Patch(':id_client')
    update(
        @Param('id_client', ParseIntPipe) id_client: number,
        @Body() dto: UpdateClientDto,
    ) {
        return this.clientService.update(id_client, dto);
    }

    // Controlador para eliminar cliente. / Controller to delete client.
    @Delete(':id_client')
    remove(@Param('id_client', ParseIntPipe) id_client: number) {
        return this.clientService.remove(id_client);
    }
}
