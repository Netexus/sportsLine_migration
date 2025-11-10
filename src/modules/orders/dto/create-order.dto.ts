import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { OrderStatus } from '../entities/order.entity';

export class CreateOrderDto {
  @IsUUID()
  clientId: string;

  @IsArray()
  @ArrayMinSize(1)
  productIds: string[];

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;
}
