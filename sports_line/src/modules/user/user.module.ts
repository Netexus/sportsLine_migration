import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Servicio. / Service.
import { UserService } from './user.service';

// Controlador. / Controller.
import { UserController } from './user.controller';

// Entidad. / Entity.
import { User } from './entities/user.entity';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})

export class UserModule {}
