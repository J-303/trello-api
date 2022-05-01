import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
    IsDefined,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateUserDTO {
    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    password: string;
}

export class UpdateUserDTO {
    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    username?: string;
}

export class ResponseUserDTO {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    username: string;
}

export class LoginUserDTO {
    @ApiProperty()
    @IsDefined()
    @IsEmail()
    @IsString()
    email: string;

    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    password: string;
}
