import {
    CanActivate,
    ExecutionContext,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserGuard implements CanActivate {
    constructor(private userRepo: UserRepository) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const userCheck = await this.userRepo.findOne({
            where: { id: req.params.id },
        });

        if (!userCheck) throw new NotFoundException();
        if (userCheck.id != req.user.id) throw new UnauthorizedException();

        return true;
    }
}
