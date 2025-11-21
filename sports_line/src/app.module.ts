import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppDataSource } from './data-source';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// Modulos. / Modules.
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { ClientModule } from './modules/client/client.module';
import { OrderModule } from './modules/order/order.module';
import { OrderItemModule } from './modules/order-item/order-item.module';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const options = AppDataSource.options; // Obtenemos las opciones directamente de AppDataSource.
        return options;
      },
    }),

    UserModule,
    ProductModule,
    ClientModule,
    OrderModule,
    OrderItemModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
