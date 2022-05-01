import {
    CanActivate,
    ExecutionContext,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { ColumnRepository } from './column.repository';

@Injectable()
export class ColumnOwnerGuard implements CanActivate {
    constructor(private columnRepo: ColumnRepository, private userRepo: UserRepository) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const column = await this.columnRepo.findOne({
            where: { id: req.params.id },
        });

        if (!column) throw new NotFoundException();
        if (column.ownerId != req.user.id) throw new UnauthorizedException();

        return true;
    }
}
