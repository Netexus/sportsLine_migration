import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Servicio. / Service.
import { ClientService } from './client.service';

// Controlador. / Controller.
import { ClientController } from './client.controller';

// Entidad. / Entity.
import { Client } from './entities/client.entity';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService],
})

export class ClientModule {}
