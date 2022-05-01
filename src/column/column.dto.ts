import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsDefined, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateColumnDTO {
    @ApiProperty()
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    name: string;
}

export class UpdateColumnDTO {
    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name?: string;
}

export class ResponseColumnDTO {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    name: string;

    @ApiProperty()
    @Expose()
    ownerId: number
}