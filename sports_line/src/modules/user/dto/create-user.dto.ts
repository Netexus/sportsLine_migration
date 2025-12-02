import { IsString, IsEmail, IsEnum, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

import { UserRole } from '../enum/user-role.enum';

// - - - - - - - - - - - - - - - - - - - - - - - - - - -

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    full_name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(5, { message: 'The password must be at least 5 characters long.' })
    @IsNotEmpty()
    password: string;

    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;
}
