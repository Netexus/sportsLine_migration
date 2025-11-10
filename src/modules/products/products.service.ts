import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  create(payload: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create(payload);
    return this.productsRepository.save(product);
  }

  findAll(): Promise<Product[]> {
    return this.productsRepository.find({ order: { name: 'ASC' } });
  }

  findManyByIds(ids: string[]): Promise<Product[]> {
    if (!ids?.length) {
      return Promise.resolve([]);
    }

    return this.productsRepository.find({ where: { id: In(ids) } });
  }
}
