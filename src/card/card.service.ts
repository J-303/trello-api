import { Injectable, NotFoundException } from '@nestjs/common';
import { ColumnRepository } from 'src/column/column.repository';
import { UserRepository } from 'src/user/user.repository';
import { CreateCardDTO, UpdateCardDTO } from './card.dto';
import { CardRepository } from './card.repository';

@Injectable()
export class CardService {
    constructor(
        private cardRepo: CardRepository,
        private userRepo: UserRepository,
        private columnRepo: ColumnRepository,
    ) {}

    async getMany(ownerId: number) {
        const user = await this.userRepo.findOne({ where: { id: ownerId } });
        if (!user) throw new NotFoundException();
        return (await this.cardRepo.find({ where: { ownerId } })).map((card) =>
            this.cardRepo.response(card),
        );
    }

    async getOne(id: number) {
        const card = await this.cardRepo.findOne({ where: { id } });
        if (!card) throw new NotFoundException();
        return this.cardRepo.response(card);
    }

    async createOne(req, dto: CreateCardDTO, columnId: number) {
        const owner = await this.userRepo.findOne({
            where: { id: req.user.id },
        });
        const column = await this.columnRepo.findOne({
            where: { id: columnId },
        });
        const card = this.cardRepo.create({ ...dto, owner, column });
        await this.cardRepo.save(card);
        return this.cardRepo.response(card);
    }

    async updateOne(dto: UpdateCardDTO, id: number) {
        await this.cardRepo.update({ id }, dto);
        const card = await this.cardRepo.findOne({ where: { id } });
        return this.cardRepo.response(card);
    }

    async deleteOne(id: number) {
        const card = await this.cardRepo.findOne({ where: { id } });
        this.cardRepo.delete({ id });
        return this.cardRepo.response(card);
    }
}
