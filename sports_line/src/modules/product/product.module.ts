import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Servicio. / Service.
import { ProductService } from './product.service';

// Controlador. / Controller.
import { ProductController } from './product.controller';

// Entidad. / Entity.
import { Product } from './entities/product.entity';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})

export class ProductModule {}
