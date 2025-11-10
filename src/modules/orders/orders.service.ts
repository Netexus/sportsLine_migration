import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientsService } from '../clients/clients.service';
import { ProductsService } from '../products/products.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order, OrderStatus } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    private readonly clientsService: ClientsService,
    private readonly productsService: ProductsService,
  ) {}

  async create(payload: CreateOrderDto): Promise<Order> {
    const client = await this.clientsService.findOneOrFail(payload.clientId);
    const products = await this.productsService.findManyByIds(
      payload.productIds,
    );

    if (!products.length) {
      throw new BadRequestException(
        'At least one valid product is required to create an order',
      );
    }

    if (products.length !== payload.productIds.length) {
      throw new NotFoundException('One or more products were not found');
    }

    const total = products.reduce(
      (sum, product) => sum + Number(product.price),
      0,
    );

    const order = this.ordersRepository.create({
      client,
      products,
      total,
      status: payload.status ?? OrderStatus.PENDING,
    });

    return this.ordersRepository.save(order);
  }

  findAll(): Promise<Order[]> {
    return this.ordersRepository.find({
      relations: ['client', 'products'],
      order: { createdAt: 'DESC' },
    });
  }
}
