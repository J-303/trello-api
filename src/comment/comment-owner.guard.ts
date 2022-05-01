import {
    CanActivate,
    ExecutionContext,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentOwnerGuard implements CanActivate {
    constructor(private commentRepo: CommentRepository) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const comment = await this.commentRepo.findOne({
            where: { id: req.params.id },
        });

        if (!comment) throw new NotFoundException();
        if (comment.ownerId != req.user.id) throw new UnauthorizedException();

        return true;
    }
}
