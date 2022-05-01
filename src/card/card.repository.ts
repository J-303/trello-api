import { plainToClass } from "class-transformer";
import { EntityRepository, Repository } from "typeorm";
import { ResponseCardDTO } from "./card.dto";
import { CardEntity } from "./card.entity";

@EntityRepository(CardEntity)
export class CardRepository extends Repository<CardEntity> {
    response(card: CardEntity): ResponseCardDTO {
        const result: ResponseCardDTO = plainToClass(
            ResponseCardDTO,
            card,
            { excludeExtraneousValues: true },
        );
        return result;
    }
}