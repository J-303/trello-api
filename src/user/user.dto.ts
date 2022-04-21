import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger'

export class UserDTO {
    @ApiProperty()
    @IsNotEmpty()
    username?: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    newPass?: string;
}

export class UserDTOResponse {
    @ApiProperty()
    @IsNotEmpty()
    username?: string;

    @ApiProperty()
    @IsEmail()
    email: string;
}