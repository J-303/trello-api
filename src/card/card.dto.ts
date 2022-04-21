import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CardDTO {
    @ApiProperty()
    @IsNotEmpty()
    name: string;
}

export class CardDTOResponse {
    @ApiProperty()
    name: string;
}