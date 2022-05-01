import {
    CanActivate,
    ExecutionContext,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { CardRepository } from './card.repository';

@Injectable()
export class CardOwnerGuard implements CanActivate {
    constructor(private cardRepo: CardRepository) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const card = await this.cardRepo.findOne({
            where: { id: req.params.id },
        });

        if (!card) throw new NotFoundException();
        if (card.ownerId != req.user.id) throw new UnauthorizedException();

        return true;
    }
}
