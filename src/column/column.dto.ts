import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ColumnDTO {
    @ApiProperty()
    @IsNotEmpty()
    name: string;
}

export class ColumnDTOResponse {
    @ApiProperty()
    @IsNotEmpty()
    name: string;
}