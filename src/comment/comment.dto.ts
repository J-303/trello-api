import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CommentDTO { 
    @ApiProperty()
    @IsNotEmpty()
    content: string;
}
