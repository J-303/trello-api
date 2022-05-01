import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCardDTO {
    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    content?: string;
}

export class UpdateCardDTO {
    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name?: string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    content?: string;
}

export class ResponseCardDTO {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    name: string;

    @ApiProperty()
    @Expose()
    content?: string;

    @ApiProperty()
    @Expose()
    ownerId: number;
}
