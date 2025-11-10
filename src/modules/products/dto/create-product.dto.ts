import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber({ allowNaN: false, maxDecimalPlaces: 2 })
  @IsPositive()
  price: number;

  @IsOptional()
  @IsNumber()
  stock?: number;
}
