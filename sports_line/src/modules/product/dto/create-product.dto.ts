import { IsString, IsOptional, IsInt, Min, IsNumber, IsPositive, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
    @IsString()
    @MaxLength(100)
    name: string;

    @IsOptional()
    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    price: number;

    @IsInt()
    @Min(0)
    @Type(() => Number)
    stock: number;
}
