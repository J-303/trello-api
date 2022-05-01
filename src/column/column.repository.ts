import { plainToClass } from 'class-transformer';
import { EntityRepository, Repository } from 'typeorm';
import { ResponseColumnDTO } from './column.dto';
import { ColumnEntity } from './column.entity';

@EntityRepository(ColumnEntity)
export class ColumnRepository extends Repository<ColumnEntity> {
    response(column: ColumnEntity): ResponseColumnDTO {
        const result: ResponseColumnDTO = plainToClass(
            ResponseColumnDTO,
            column,
            { excludeExtraneousValues: true },
        );
        return result;
    }
}
