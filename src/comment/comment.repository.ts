import { plainToClass } from "class-transformer";
import { EntityRepository, Repository } from "typeorm";
import { ResponseCommentDTO } from "./comment.dto";
import { CommentEntity } from "./comment.entity";

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {
    response(comment: CommentEntity): ResponseCommentDTO {
        const result: ResponseCommentDTO = plainToClass(
            ResponseCommentDTO,
            comment,
            { excludeExtraneousValues: true },
        );
        return result;
    }
}