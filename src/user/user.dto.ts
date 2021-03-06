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
    newPass?: string;
}
