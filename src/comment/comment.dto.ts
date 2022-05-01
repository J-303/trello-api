import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCommentDTO {
    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    content: string;
}

export class UpdateCommentDTO {
    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    content?: string;
}

export class ResponseCommentDTO {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    content: number;

    @ApiProperty()
    @Expose()
    ownerId: number;

    @ApiProperty()
    @Expose()
    cardId: number;
}
