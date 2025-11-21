import { IsString, IsEmail, IsNotEmpty, IsPhoneNumber, MinLength, IsOptional } from 'class-validator';

export class CreateClientDto {
    @IsString()
    @IsNotEmpty()
    full_name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsPhoneNumber('CO')
    @MinLength(10)
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsOptional()
    address?: string;
}
