import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { envValidationSchema } from './config/config.validation';

import { AppDataSource } from './data-source';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// Modulos. / Modules.
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { ClientModule } from './modules/client/client.module';
import { OrderModule } from './modules/order/order.module';
import { OrderItemModule } from './modules/order-item/order-item.module';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// Middlewares.
import { LoggingMiddleware } from './middlewares/loggin.middleware';
import { AuthModule } from './modules/auth/auth.module';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - 

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [appConfig, databaseConfig],
      validationSchema: envValidationSchema,
    }),
    
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const options = AppDataSource.options;
        return options;
      },
    }),

    UserModule,
    ProductModule,
    ClientModule,
    OrderModule,
    OrderItemModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
